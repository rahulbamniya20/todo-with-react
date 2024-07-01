import { ADD_TODO, UPDATE_TODO, DELETE_TODO, SET_TODOS } from './actions';

// Function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('todos');
    if (serializedState === null) {
      // Return an empty array if no todos are saved
      return [];
    }
    // Parse the serialized state back into an object
    return JSON.parse(serializedState);
  } catch (err) {
    // Return an empty array if an error occurs
    return [];
  }
};

// Function to save state to localStorage
const saveState = (todos) => {
  try {
    const serializedState = JSON.stringify(todos);
    localStorage.setItem('todos', serializedState);
  } catch {
    // Ignore write errors
  }
};

// Initial state of the application, loaded from localStorage
const initialState = {
  todos: loadState(),
};

// Root reducer function to handle different actions
const rootReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_TODO:
      // Handle adding a new todo
      newState = {
        ...state,
        todos: [...state.todos, action.payload],
      };
      break;
    case UPDATE_TODO:
      // Handle updating an existing todo
      newState = {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
      break;
    case DELETE_TODO:
      // Handle deleting a todo by id
      newState = {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
      break;
    case SET_TODOS:
      // Handle setting the todos (useful for initializing the state)
      newState = {
        ...state,
        todos: action.payload,
      };
      break;
    default:
      // Return current state if action type is not recognized
      return state;
  }
  // Save the new state to localStorage
  saveState(newState.todos);
  return newState;
};

export default rootReducer;
