from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from .database import Base
from enum import Enum

class VectorDBType(str, Enum):
    CHROMA = "chroma"
    NEON = "neon"
    PINECONE = "pinecone"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

class Node(Base):
    __tablename__ = "nodes"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, index=True)
    parent_id = Column(Integer, ForeignKey("nodes.id"))
    children = relationship("Node")

class Runnable(Base):
    __tablename__ = "runnables"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String)
    status = Column(String, default="idle")