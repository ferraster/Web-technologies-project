import React from 'react';
import {HeaderComponent}  from '../components/Headers'
import {ResetPasswordBox} from "../components/ResetPasswordBox"


function HomeComponent(){
  
  return(
  <React.StrictMode>
    <section id = "headerWrapper">
      <HeaderComponent loadSearchBar = "N" loadEditPassButton = "N"/> 
    </section>
    <section id = "itemListWrapper">
      <ResetPasswordBox/>
    </section>
  </React.StrictMode>
  )
}

export default HomeComponent;
