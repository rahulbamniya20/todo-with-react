// Import necessary dependencies
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTodos } from "../redux/actions";
import TodoItem from "./TodoItem";
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion

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
    // Render an animated unordered list of todos
    <motion.ul className='main__todoList'>
      <AnimatePresence>
        {/* Map through todos and render a TodoItem for each */}
        {todos.map((task, index) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <TodoItem task={task} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};

export default TaskList;