import React, { Component } from 'react';
import axios from "axios";
import TodoStore from '../stores/TodoStore';

export default class ListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: TodoStore.getAll()
        };   
    }
    
    componentWillMount() {
        axios("http://localhost:5000/").then(res=>{
            const todos = res.data;
            this.setState({todos:TodoStore.updateAll(todos)});
        });
    }

    makeChange(task,path){
        axios.post(`http://localhost:5000/${path}/${task.id}`)
        .then(function (response) {
            console.log("response: ", response);
        })
        .catch(function (error) {
            console.log('Something wrong... ', error);
        });
    }
    
    render(){
        return (this.state.todos.map((todo, i) => {
            if(todo.isdone){
                return (
                <li key={i}>
                    <input type="checkbox" id="isdone" name="isdone" onChange={()=>this.makeChange(todo,'edit')} checked/>
                    {todo.task}
                    <button onClick={()=>this.makeChange(todo,"delete")}>Delete</button>
                </li>)
            }
            else{
                return (
                <li key={i}>
                    <input type="checkbox" id="isdone" name="isdone" onChange={()=>this.makeChange(todo,'edit')} />
                    {todo.task}
                    <button onClick={()=>this.makeChange(todo,"delete")}>Delete</button>
                </li>)
            }}))
    }
}