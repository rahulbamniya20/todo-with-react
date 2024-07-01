// Action types for the todo application
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const SET_TODOS = 'SET_TODOS';

// Action creator to add a new todo
export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

// Action creator to update an existing todo
export const updateTodo = (todo) => ({
  type: UPDATE_TODO,
  payload: todo,
});

// Action creator to delete a todo by id
export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

// Action creator to set the todos (useful for initializing the state with an array of todos)
export const setTodos = (todos) => ({
  type: SET_TODOS,
  payload: todos,
});
