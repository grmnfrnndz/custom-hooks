import React, {useEffect, useReducer} from 'react';
import {todoReducer} from "./todoReducer.js";

const initialState = [];

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = () => {
    const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init);

    // detect when read create update delete
    useEffect(
        () => {
            localStorage.setItem('todos', JSON.stringify(todos));
        },
        [todos]
    );

    const onNewTodo = (todo) => {
        const newTodoAction = {
            type: '[Todo] Add Todo',
            payload: todo
        }

        dispatchTodo(newTodoAction);
    }

    const onDeleteTodo = (id) => {
        const deleteTodo = {
            type: '[Todo] Delete Todo',
            payload: id
        }
        dispatchTodo(deleteTodo);
    }

    const onToggleTodo = (id) => {
        console.log(id);
        const toggleTodo = {
            type: '[Todo] Toggle Todo',
            payload: id
        }
        dispatchTodo(toggleTodo);
    }

    return {
        todos, onNewTodo, onToggleTodo, onDeleteTodo,
        todosCount: todos.length,
        todosPending: todos.filter(todo => !todo.done).length
    }
}