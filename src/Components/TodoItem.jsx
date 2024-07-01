import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo, deleteTodo } from '../redux/actions';

// Component to represent a single todo item
const TodoItem = ({ task }) => {
  // Local state to manage edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Get dispatch function from redux to dispatch actions
  const dispatch = useDispatch();
  
  // Get the todos from redux store (though it is not used in this component)
  const todos = useSelector(state => state.todos);

  // Toggle edit mode
  const handleEditing = () => {
    setIsEditing(!isEditing);
  }

  // Toggle the completion status of the todo item
  const handleToggleStatus = () => {
    dispatch(updateTodo({ ...task, isCompleted: !task.isCompleted }));
  };

  // Delete the todo item
  const handleDeleteTodo = () => {
    dispatch(deleteTodo(task.id));
  };

  // Handle the change in edit input
  const handleEditInput = (e) => {
    dispatch(updateTodo({ ...task, name: e.target.value }));
  }

  return (
    <li className='todoItem'>
      {/* Checkbox to toggle the completion status of the task */}
      <input
        onChange={handleToggleStatus}
        className='task--check'
        type='checkbox'
        id='myCheckbox'
        name='myCheckbox'
        value='true'
        checked={task.isCompleted}
      />
      
      {/* Display task name conditionally based on its completion status and edit mode */}
      {!task.isCompleted ? 
        (isEditing ? 
          <input onChange={handleEditInput} className='task--editInput' type='text' value={task.name}/> : 
          <p className='task--undone'>{task.name}</p>
        ) : 
        <s className='task--done'>{task.name}</s>
      } 
      
      {/* Show edit/save icon based on edit mode, only if the task is not completed */}
      {!task.isCompleted && <i className={`task--edit bx ${isEditing ? 'bx-save' : 'bx-edit'} `} onClick={handleEditing}></i>}
      
      {/* Delete icon to delete the task */}
      <i className='task--delete bx bx-trash' onClick={handleDeleteTodo}></i>
    </li>
  );
};

export default TodoItem;
