import json
from app import app, engine, cross_origin
from flask import Flask, render_template,g, redirect, url_for, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import  update
from sqlalchemy.orm import relationship
from database import Base, Users, Task, Todo

# make a router
@app.route("/", methods=['GET','POST'])
@cross_origin()
def list():
    if request.method == 'POST':
        task = request.form["task"]
        name = request.form["name"]
        taskData = session.query(Task).all()
        engine.connect()
        # if user exist, do not store in users table.
        # otherwise insert into the table.
        user_id = _searchUserNumber(name)
        if(_isUserExist(name)):
            session.add(Users(id=user_id, name=name))
            session.add(Task(task_id=len(taskData)+1, task = task, isdone=False, user_id=user_id))
        else:
            session.add(Task(task_id=len(taskData)+1, task = task, isdone=False, user_id=user_id))
        session.commit()
        session.rollback()
        return redirect('http://localhost:8080/')
    else:
        return _get()


@app.route("/edit/<int:id>", methods=['POST'])
@cross_origin()
def edit(id):
    if request.method =='POST':
        print('fired')
        print(id)
        todo = session.query(Task).filter_by(task_id=id).first()
        todo.isdone = not todo.isdone
        session.add(todo)
        session.commit()
        return redirect('http://localhost:8080/')
    else:
        return app


@app.route("/delete/<int:id>",methods=['POST'])
@cross_origin()
def delete(id):
    if request.method == 'POST':
        todo = session.query(Todo).filter_by(id=id).first()
        session.delete(todo)
        session.commit()
        return redirect('http://localhost:8080/')

def _get():
    taskData = session.query(Task).order_by("task_id").all()
    userData = session.query(Users).join(Task, Users.id==Task.user_id)
    print(userData)
    todos = []
    for todo in range(len(taskData)):
        taskDict={}
        taskDict["id"]=taskData[todo].task_id
        taskDict["task"]=taskData[todo].task
        taskDict["isdone"]=taskData[todo].isdone
        taskDict["user"]=userData[todo].name
        todos.append(taskDict)
    return json.dumps(todos)


def _searchUserNumber(targetUser):
    users = session.query(Users).all()
    userList = []
    for user in range(len(users)):
        print(users[user].id,users[user].name)
        userList.append(users[user].name)
    if targetUser in userList:
        return userList.index(targetUser)+1
    else:
        return len(users)+2

def _isUserExist(targetUser):
    users = session.query(Users).all()
    return targetUser in users