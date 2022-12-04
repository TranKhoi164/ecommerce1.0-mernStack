import React from 'react';
import './App.css';
import HeaderOnscroll from './components/header/HeaderOnScroll';
import { BrowserRouter } from 'react-router-dom'
import Router from './components/Router';
import AxiosJWT from './AxiosJWT';


function App() {

  return (
    <BrowserRouter>
      <>
        <HeaderOnscroll />
        <div className='App'>
          <Router />
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
