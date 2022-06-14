import React from "react"
import {Navigate} from "react-router-dom"
import {axiosInstance} from "../axios"


export class ResetPasswordBox extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            resetResult : null
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit = (event) => {
        event.preventDefault()

        var oldPass   = document.getElementById("oldPassInput").value
        var password1 = document.getElementById("newPass1Input").value
        var password2 = document.getElementById("newPass2Input").value
      
    
        let password
        if(password1 == password2 && password1 != ""){
          password = password1
    
          var payload = { 
            oldPass:oldPass,
            newPass:password
          }

          axiosInstance
          .post(`shop/resetpass/${localStorage.getItem("username")}/`,payload)
          .then((response) =>{
            this.setState({resetResult : response.data})
          })
          .catch((error) => {
            if(error.response.status == 401){
              alert("Wrong password")
            }
            else{
              alert("Unexpected error")
            }
          })
        }
        else if(password1 == ""){
          alert("Password cannot be empty")
        }
        else{
          alert("The passwords are not the same")
        }
    }

    componentDidUpdate(){
        if(this.state.resetResult['success']){
          alert("Password reseted successfully")
        }
        else{
          alert(this.state.resetResult['msg'])
        }    
    }


    render(){

      var resetPassBoxStyle= {
        width : '99.7%',
        height: '80%',
        display: 'grid',
        'grid-template-columns': '50% 50%',
        'grid-template-rows': '33% 33% 33%',
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

        if(this.state.resetResult != null)
            if(this.state.resetResult['success']){
            return(<Navigate to="/shop/"/>)
            }

        return(
            <div style = {parentStyle}>
              <form style = {resetPassBoxStyle} id = "resetPassForm" onSubmit={this.onSubmit} method = 'POST'>
                  <label style = {labelStyle}>Old password:</label>
                  <input style = {inputStyle} id = "oldPassInput" type= 'password' name = "oldPassword"  />
                  <label style = {labelStyle}>New password:</label>
                  <input style = {inputStyle} id = "newPass1Input" type= 'password' name = "password1"  />
                  <label style = {labelStyle}>Repeat new password:</label>
                  <input style = {inputStyle} id = "newPass2Input" type= 'password' name = "password2" />
              </form>
              <button form = "resetPassForm" style = {buttonStyle} type = "submit">Reset password</button>
            </div>
        )
    }
}

export default ResetPasswordBox;