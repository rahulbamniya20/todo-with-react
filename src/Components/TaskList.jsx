// Import necessary dependencies
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTodos } from "../redux/actions";
import TodoItem from "./TodoItem";

// TaskList component to display the list of todos
const TaskList = () => {
  // Get todos from Redux store
  const todos = useSelector(state => state.todos);
  
  // Hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Effect to load todos from localStorage on component mount
  useEffect(() => {
    let tempData = localStorage.getItem('todos');
    if (tempData) {
      dispatch(setTodos(JSON.parse(tempData)));
    }
  }, [dispatch]); // Dependency array includes dispatch to satisfy eslint

  // Effect to save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    // Render an unordered list of todos
    <ul className='main__todoList'>
      {/* Map through todos and render a TodoItem for each */}
      {todos.map((task) => (
        <TodoItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;