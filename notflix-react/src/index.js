import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import HomeComponent from './routes/HomeComponent';
import LogInComponent from './routes/LogInComponent';
import SignUpComponent from './routes/SignUpComponent';
import MyItemsComponent from './routes/MyItemsComponent';
import MyAccountComponent from './routes/MyAccountComponent';
import ShoppingCartComponent from './routes/ShoppingCartComponent';
import './index.css';


//<Route path = "/signup"     element={<SignUpComponent />}/>
//<Route path = "/account"    element={<AccountComponent/>}/>
//<Route path = "/myitems"    element={<MyItemsComponent/>}/>

function ShopApp(){
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path = "/shop"       element={<HomeComponent         />}/>
        <Route path = "/login"      element={<LogInComponent        />}/>
        <Route path = "/signup"     element={<SignUpComponent       />}/>
        <Route path = "/myitems"    element={<MyItemsComponent      />}/>
        <Route path = "/account"    element={<MyAccountComponent    />}/>
        <Route path = "/cart"       element={<ShoppingCartComponent />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}


ReactDOM.render(
    <ShopApp/>,
  document.getElementById('root')
);


