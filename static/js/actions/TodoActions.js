import dispatcher from "../dispatcher/dispatcher";

export function updateTodo(task) {
    dispatcher.dispatch({
        type: "UPDATE_TODO",
        task
    });
}
