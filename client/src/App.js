import React from 'react';
import './App.css';
import 'rsuite/lib/styles/index.less';
import Dashboard from './components/MainPage/Dashboard';
import Header from './views/Header';


function App() {
  return (
    <div>
        <Header/>
        <Dashboard/>
    </div>

  );
}

export default App;
