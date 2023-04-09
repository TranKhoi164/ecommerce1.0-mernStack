import React, {useEffect, useState} from 'react';
import './App.css';
import HeaderOnscroll from './components/header/HeaderOnScroll';
import { BrowserRouter, redirect, useNavigate } from 'react-router-dom'
import Router from './components/Router';
import { AccountJwtApi } from './api/accountApi'
import { PageJwtApi } from './api/pageApi';

function App() {
  const {getAccountInfor} = AccountJwtApi()
  const {getPageListApi} = PageJwtApi()
  // const {getOrdersInCartApi} = OrderManagementJwtApi()

  const [pages, setPages] = useState([])
  // const [orders, setOrders] = useState({})

  useEffect(() => {
    Promise.all([
      getAccountInfor(), 
    ])
    getPageListApi()
    .then(data => setPages(data.page_list))
    .catch(e => console.log(e))
    // getOrdersInCartApi().then(data => {console.log(data.orders);}).catch(e => console.log(e))
    // getAccountInfor()
    // getPageList()
  }, [])
  


  return (
    <BrowserRouter>
      <>
        <HeaderOnscroll pages={pages} />
        <div className='App'>
          <Router pages={pages} setPages={setPages}/>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
