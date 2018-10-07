import { EventEmitter } from "events";
import dispatcher from "../dispatcher/dispatcher.js";

class TodoStore extends EventEmitter{
    constructor(){
        super();
        this.todos = [
            {
                task_id:1,
                task:"Relax",
                isdone:true,
                user_id:1
            },{
                task_id:2,
                task:"Relax",
                isdone:true,
                user_id:2
            }
        ];
    }

    updateAll(task){
        return this.todos = task;
    }

    getAll(){
        return this.todos;
    }

    updateTodo(task){
        this.todos = task;
        this.emit("change");
    }

    handleActions(action){
        switch(action.type){
            case "UPDATE_TODO":{
                this.updateTodo(action.task);
                break;
            }
            default:
                return action.type;
        }
    }
}

const todoStore = new TodoStore();
dispatcher.register(todoStore.handleActions.bind(todoStore));
window.dispatcher = dispatcher;
export default todoStore;