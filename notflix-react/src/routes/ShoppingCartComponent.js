import React from 'react';
import { HeaderComponent } from '../components/Headers';
import {Cart} from '../components/Cart';

function ShoppingCartComponent(){
    return(
    <React.StrictMode>
      <section id = "headerWrapper">
      <HeaderComponent loadSearchBar = "N" loadCartButton = "N"/>
      </section>
      <Cart/>
    </React.StrictMode>
    )
  }
  
  export default ShoppingCartComponent;