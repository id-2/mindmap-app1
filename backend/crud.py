from sqlalchemy.orm import Session
from . import models, schemas
from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta=None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_nodes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Node).offset(skip).limit(limit).all()

def get_node(db: Session, node_id: int):
    return db.query(models.Node).filter(models.Node.id == node_id).first()

def create_node(db: Session, node: schemas.NodeCreate):
    db_node = models.Node(**node.dict())
    db.add(db_node)
    db.commit()
    db.refresh(db_node)
    return db_node

def update_node(db: Session, node_id: int, node: schemas.NodeCreate):
    db_node = get_node(db, node_id)
    for key, value in node.dict().items():
        setattr(db_node, key, value)
    db.commit()
    db.refresh(db_node)
    return db_node

def delete_node(db: Session, node_id: int):
    db_node = get_node(db, node_id)
    db.delete(db_node)
    db.commit()

def get_runnable(db: Session, runnable_id: int):
    return db.query(models.Runnable).filter(models.Runnable.id == runnable_id).first()

def run_runnable(db: Session, runnable_id: int):
    runnable = get_runnable(db, runnable_id)
    runnable.status = "running"
    db.commit()
    return runnable