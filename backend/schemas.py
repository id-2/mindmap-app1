from typing import List, Optional
from pydantic import BaseModel
from .models import VectorDBType

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True

class NodeBase(BaseModel):
    text: str

class NodeCreate(NodeBase):
    parent_id: Optional[int] = None

class Node(NodeBase):
    id: int
    parent_id: Optional[int] = None
    children: List["Node"] = []

    class Config:
        orm_mode = True

Node.update_forward_refs()

class NodePrompt(BaseModel):
    prompt: str

class VectorDBConnection(BaseModel):
    type: VectorDBType
    url: str

class RunnableBase(BaseModel):
    code: str

class RunnableCreate(RunnableBase):
    pass

class Runnable(RunnableBase):
    id: int
    status: str

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str