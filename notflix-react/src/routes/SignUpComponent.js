import React from 'react';
import { HeaderComponent } from '../components/Headers';
import {RegisterBox} from '../components/RegisterBox';

function SignUpComponent(){
    return(
    <React.StrictMode>
      <section id = "headerWrapper">
        <HeaderComponent/> 
      </section>
      <RegisterBox/>
    </React.StrictMode>
    )
  }
  
  export default SignUpComponent;


