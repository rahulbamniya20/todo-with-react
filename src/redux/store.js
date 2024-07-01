
// Import the createStore function from Redux and the root reducer
import { legacy_createStore as createStore } from 'redux';
import rootReducer from './reducer';

// Create the Redux store using the root reducer
const store = createStore(rootReducer);

// Export the store as the default export
export default store;
