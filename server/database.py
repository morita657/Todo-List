from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Boolean,ForeignKey


Base = declarative_base()

# make instance
class Todo(Base):
    __tablename__ = 'list'
    id = Column(Integer, primary_key=True)
    tasks = Column(String(255))
    isdone = Column(Boolean())

class Users(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(255))

class Task(Base):
    __tablename__ = 'task'
    task_id = Column(Integer, primary_key=True)
    task = Column(String(255))
    isdone = Column(Boolean())
    user_id = Column(Integer, ForeignKey("users.id"))

