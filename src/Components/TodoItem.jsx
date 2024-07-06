import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo, deleteTodo } from '../redux/actions';
import { motion, AnimatePresence } from 'framer-motion';

const TodoItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  const handleEditing = () => {
    setIsEditing(!isEditing);
  }

  const handleToggleStatus = () => {
    dispatch(updateTodo({ ...task, isCompleted: !task.isCompleted }));
  };

  const handleDeleteTodo = () => {
    dispatch(deleteTodo(task.id));
  };

  const handleEditInput = (e) => {
    dispatch(updateTodo({ ...task, name: e.target.value }));
  }

  return (
    <motion.li 
      className='todoItem'
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
    >
      <motion.input
        whileTap={{ scale: 0.9 }}
        onChange={handleToggleStatus}
        className='task--check'
        type='checkbox'
        id='myCheckbox'
        name='myCheckbox'
        value='true'
        checked={task.isCompleted}
      />
      
      <AnimatePresence mode="wait">
        {!task.isCompleted ? 
          (isEditing ? 
            <motion.input 
              key="editing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onChange={handleEditInput} 
              className='task--editInput' 
              type='text' 
              value={task.name}
            /> : 
            <motion.p 
              key="normal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='task--undone'
            >
              {task.name}
            </motion.p>
          ) : 
          <motion.s 
            key="completed"
            initial={{ opacity: 0, textDecoration: 'none' }}
            animate={{ opacity: 0.5, textDecoration: 'line-through' }}
            exit={{ opacity: 0 }}
            className='task--done'
          >
            {task.name}
          </motion.s>
        } 
      </AnimatePresence>
      
      {!task.isCompleted && 
        <motion.i 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`task--edit bx ${isEditing ? 'bx-save' : 'bx-edit'} `} 
          onClick={handleEditing}
        />
      }
      
      <motion.i 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className='task--delete bx bx-trash' 
        onClick={handleDeleteTodo}
      />
    </motion.li>
  );
};

export default TodoItem;