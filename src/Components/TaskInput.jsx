// Import necessary dependencies
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/actions';
import { v4 as uuid } from 'uuid';

// TaskInput component for adding new todos
const TaskInput = () => {
  // State to manage the current todo input
  const [currentTodo, setCurrentTodo] = useState('');
  
  // Hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Validate input: don't allow empty todos
    if (currentTodo === '') {
      alert('Empty todos are not allowed');
      return;
    }
    
    // Create a new todo object
    let todoObj = {
      id: uuid(), // Generate a unique ID
      name: currentTodo,
      isCompleted: false,
    };
    
    // Dispatch the addTodo action with the new todo
    dispatch(addTodo(todoObj));
    
    // Clear the input field after adding
    setCurrentTodo('');
  };

  return (
    <form className='main__content--form' onSubmit={handleSubmit}>
      <div className='inputControl'>
        {/* Input field for todo text */}
        <input
          className='main__content--input'
          type='text'
          value={currentTodo}
          onChange={(e) => setCurrentTodo(e.target.value)}
          placeholder='Enter todos here...'
        />
        {/* Submit button (plus icon) */}
        <i
          className='main__content--inputSend bx bxs-plus-square'
          onClick={handleSubmit}
        ></i>
      </div>
    </form>
  );
};

export default TaskInput;