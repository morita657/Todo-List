# import os
# import json
# from flask import Flask, session
# from database import Base, Users, Task, Todo
# # render_template,g, redirect, url_for, request, jsonify, 
# # from sqlalchemy import create_engine
# # from sqlalchemy.orm import sessionmaker

# # db_uri = "postgresql://localhost/todolist"
# # app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
# # engine = create_engine(db_uri)
# # Session = sessionmaker(bind=engine)
# # session = Session()
# from app import *
# from router import *
# def _get():
#     taskData = session.query(Task).order_by("task_id").all()
#     userData = session.query(Users).join(Task, Users.id==Task.user_id)
#     print(userData)
#     todos = []
#     for todo in range(len(taskData)):
#         taskDict={}
#         taskDict["id"]=taskData[todo].task_id
#         taskDict["task"]=taskData[todo].task
#         taskDict["isdone"]=taskData[todo].isdone
#         taskDict["user"]=userData[todo].name
#         todos.append(taskDict)
#     return json.dumps(todos)


# def _searchUserNumber(targetUser):
#     users = session.query(Users).all()
#     userList = []
#     for user in range(len(users)):
#         print(users[user].id,users[user].name)
#         userList.append(users[user].name)
#     if targetUser in userList:
#         return userList.index(targetUser)+1
#     else:
#         return len(users)+2


# def _isUserExist(targetUser):
#     users = session.query(Users).all()
#     return targetUser in users