import React from "react";
import {Navigate} from "react-router-dom";
import { axiosInstance } from "../axios";

export class LogInBox extends React.Component{

    constructor(props){
      super(props)
      this.state={
        loginResult   : null,
        loginAttemted : null
      }
  
      this.onSubmit = this.onSubmit.bind(this)
    }
  
    onSubmit = (event) => {
      event.preventDefault();
  
      var username = event.target.username.value
      var password = event.target.password.value
  
      let payload = { username: username,
                  password: password}
  
      axiosInstance
      .post(`token/`,payload)
      .then((response) =>{
          this.setState({loginResult : response.data })
    
          localStorage.setItem('access_token',response.data.access);
          localStorage.setItem('refresh_token',response.data.refresh);
          localStorage.setItem("username",username)
          axiosInstance.defaults.headers['Authorization'] = 
          'JWT ' +localStorage.getItem('access_token');
      })
      .catch((error) => {
        if(error.response.status == 401){
          alert("Wrong credentials")
        }
        else{
          alert("Unexpected error")
        }
      })
    }
  
  
    componentDidUpdate(){
      if(this.state.loginResult){
        alert("Logged in successfully")
       
      }
      else{
        alert("Wrong credentials")
      }    
    }
    
    
    render(){ 
  
      if(this.state.loginResult!= null){
        if(this.state.loginResult){
          return( <Navigate to = "/shop/"/>)
        }
      }

      var loginBoxStyle= {
        width : '99.7%',
        height: '80%',
        display: 'grid',
        'grid-template-columns': '50% 50%',
        'grid-template-rows': '50% 50%',
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
  
      return(
        <div style = {parentStyle}>
          <form style = {loginBoxStyle} id = "loginForm" onSubmit={this.onSubmit} method = 'POST'>
            <label style = {labelStyle} id = "labelName" for = "user">Username:</label>
            <input style = {inputStyle} type= 'text' name = "username"  />
            <label style = {labelStyle} id = "labelPasswd" for = "passwd">Password:</label>
            <input style = {inputStyle} type= 'password' name = "password" />
          </form>
          <button form = "loginForm" style = {buttonStyle} type = "submit">Login</button>
        </div>
      )
    }
  }

export default LogInBox;