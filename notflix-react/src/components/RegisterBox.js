import React from "react";
import {Navigate} from "react-router-dom";
import { axiosInstance } from "../axios";

export class RegisterBox extends React.Component{
    constructor(props){
      super(props)
      this.state ={
        signUpResult : null,
      }
      this.onSubmit = this.onSubmit.bind(this)
    }
  
    onSubmit = (event) => {
      event.preventDefault();
  
      var password1 = document.getElementById("password1Input").value
      var password2 = document.getElementById("password2Input").value
      var email     = document.getElementById("emailInput").value
      var username  = document.getElementById("usernameInput").value
  
      let password
      if(password1 == password2 && username != "" && password1 != ""){
        password = password1
  
        var payload = { 
          email:email,
          username: username,
          password: password
        }
    
        axiosInstance
        .post(`shop/signup`,payload)
        .then((response) =>{
          this.setState({signUpResult : response.data})
        })
      }
      else if(username == ""){
        alert("Username cannot be empty")
      }
      else if(password1 == ""){
        alert("Password cannot be empty")
      }
      else{
        alert("The passwords are not the same")
      }
  }
  
    componentDidUpdate(){
      if(this.state.signUpResult['success']){
        alert("user created succesfully")
      }
      else{
        alert(this.state.signUpResult['msg'])
      }    
    }
  
  
    render(){
  
      var registerBoxStyle= {
        width : '99.7%',
        height: '80%',
        display: 'grid',
        'grid-template-columns': '50% 50%',
        'grid-template-rows': '25% 25% 25% 25%',
        borderStyle: 'solid',
        borderColor: '#73093a',
        backgroundColor: '#100d26',
        color: '#f2d649',
        marginTop: '5%'
      }
      var buttonStyle = {
        backgroundColor: '#100d26',
        borderStyle: 'solid',
        borderColor: '#f2d649',
        color: '#f2d649',
        marginTop: '2%'
      }

      var labelStyle = {
        color: '#f2d649',
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '10px'
      }

      var inputStyle = {
        borderStyle: 'solid',
        borderColor: '#73093a',
        backgroundColor: '#100d26',
        color: '#f2d649',
        marginTop: '10px',
        marginBottom: '10px',
        marginRight: '10px'
      }

      var parentStyle ={
        width: '70%',
        marginLeft: '2%'
      }
  
      if(this.state.signUpResult != null)
        if(this.state.signUpResult['success']){
          return(<Navigate to="/shop/"/>)
        }
  
      return(
        <div style = {parentStyle}>
          <form id = "registerForm" style = {registerBoxStyle} onSubmit={this.onSubmit} method = 'POST'>
            
              <label style = {labelStyle}>Email:           </label>
              <input style = {inputStyle} id = "emailInput" type= 'text' name = "email"  />
            
            
              <label style = {labelStyle}>Username:        </label>
              <input style = {inputStyle} id = "usernameInput" type= 'text' name = "username"  />
            
           
              <label style = {labelStyle}>Password:        </label>
              <input style = {inputStyle} id = "password1Input" type= 'password' name = "password1" />
           
              <label style = {labelStyle}>Repeat password: </label>
              <input style = {inputStyle} id = "password2Input" type= 'password' name = "password2" />
            
          </form>

          <button form = "registerForm" type = "submit" style = {buttonStyle}>Sign up</button>
        </div>
      )
    }
  }

export default RegisterBox;