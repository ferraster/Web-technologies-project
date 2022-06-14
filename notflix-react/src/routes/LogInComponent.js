import React from 'react';
import {HomeHeader} from "../components/Headers"
import {LogInBox} from "../components/LogInBox"


function LogInComponent(){
    return(
    <React.StrictMode>
      <section id = "headerWrapper">
        <HomeHeader/> 
      </section>
        <LogInBox/>
    </React.StrictMode>
    )
  }
  
  export default LogInComponent;

