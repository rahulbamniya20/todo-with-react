import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './Components/Header';
import TaskInput from './Components/TaskInput';
import TaskList from './Components/TaskList';
import './App.css'; 

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <main className='main'>
          <div className='main__content'>
            <TaskInput />
            <TaskList />
          </div>
        </main>
      </div>
    </Provider>
  );
}

export default App;