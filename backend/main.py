from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas, crud
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/token", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = crud.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me/", response_model=schemas.User)
async def read_users_me(current_user: schemas.User = Depends(crud.get_current_user)):
    return current_user

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db=db, user=user)

@app.get("/nodes/", response_model=List[schemas.Node])
def read_nodes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    nodes = crud.get_nodes(db, skip=skip, limit=limit)
    return nodes

@app.post("/nodes/", response_model=schemas.Node)
def create_node(node: schemas.NodeCreate, db: Session = Depends(get_db)):
    return crud.create_node(db=db, node=node)

@app.put("/nodes/{node_id}", response_model=schemas.Node)
def update_node(node_id: int, node: schemas.NodeCreate, db: Session = Depends(get_db)):
    db_node = crud.get_node(db, node_id=node_id)
    if db_node is None:
        raise HTTPException(status_code=404, detail="Node not found")
    return crud.update_node(db=db, node_id=node_id, node=node)

@app.delete("/nodes/{node_id}")
def delete_node(node_id: int, db: Session = Depends(get_db)):
    db_node = crud.get_node(db, node_id=node_id)
    if db_node is None:
        raise HTTPException(status_code=404, detail="Node not found")
    crud.delete_node(db=db, node_id=node_id)
    return {"detail": "Node deleted"}

from . import langchain, vector_db
from .schemas import NodePrompt, VectorDBConnection, Runnable
from .models import VectorDBType

@app.post("/nodes/{node_id}/prompt", response_model=schemas.Node)
def prompt_node(node_id: int, prompt: NodePrompt, db: Session = Depends(get_db)):
    db_node = crud.get_node(db, node_id=node_id)
    if db_node is None:
        raise HTTPException(status_code=404, detail="Node not found")
    text = langchain.prompt(db_node.text, prompt.prompt)
    node = schemas.NodeCreate(text=text, parent_id=node_id)
    return crud.create_node(db=db, node=node)

@app.post("/vector_db/connect", response_model=VectorDBConnection)
def connect_vector_db(connection: VectorDBConnection, db: Session = Depends(get_db)):
    if connection.type == VectorDBType.CHROMA:
        vector_db.connect_chroma(connection.url)
    elif connection.type == VectorDBType.NEON:
        vector_db.connect_neon(connection.url)
    elif connection.type == VectorDBType.PINECONE:
        vector_db.connect_pinecone(connection.url)
    else:
        raise HTTPException(status_code=400, detail="Invalid vector database type")
    return connection

@app.post("/runnables/{runnable_id}/run", response_model=Runnable)
def run_runnable(runnable_id: int, db: Session = Depends(get_db)):
    runnable = crud.get_runnable(db, runnable_id=runnable_id)
    if runnable is None:
        raise HTTPException(status_code=404, detail="Runnable not found")
    langchain.run_runnable(runnable.code)
    return runnable