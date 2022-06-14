import React from "react"
import {axiosInstance} from "../axios"

export class AddItemForm extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        newItemResult : null
      }
      this.onSubmit = this.onSubmit.bind(this)
      this.hide = this.hide.bind(this)
    }
  
    hide = () => {
      this.props.parentCallBack()
    }

    onSubmit = (event) =>{
      event.preventDefault()
      var title       = document.getElementById("titleInput").value
      var description = document.getElementById("descInput").value
      var price       = document.getElementById("priceInput").value
  
      if(title != "" && price > 0){
        var payload = {
          title       : title,
          description : description,
          price       : price
        };
        
        
        axiosInstance
        .post(`shop/additem/${localStorage.getItem("username")}/`,payload)
        .then((response) =>{
          this.setState({newItemResult : response.data})
        })
      }
      else if(price < 0){
        alert("Price cannot be negative")
      }
      else{
        alert("Title cannot be empty")
      }
    }
  
    componentDidUpdate(){
      if(this.state.newItemResult['success']){
        alert("Item created succesfully")
      }
      else{
        alert(this.state.newItemResult['msg'])
      }    
    }
  
    render(){

      var addItemFormStyle= {
        width : '99.7%',
        height: '500px',
        display: 'grid',
        'grid-template-columns': '50% 50%',
        'grid-template-rows': '10% 80% 10%',
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
        width: '100%',
        marginLeft: '2%'
      }
  

      return(
        <div style = {parentStyle}>
          <form style = {addItemFormStyle} id = "addItemForm" method = 'POST'>
            <label style = {labelStyle}>Item name: </label>
            <input style = {inputStyle} id = "titleInput" type= 'text' name = "title"  />
            <label style = {labelStyle}>Description:</label>
            <textarea style = {inputStyle} id = "descInput" type= 'text' name = "description"  />
            <label style = {labelStyle}>Price</label>
            <input style = {inputStyle} id = "priceInput" type= 'number' name = "price" />
          </form>
          <button style = {buttonStyle} form = "addItemForm" onClick = {this.onSubmit} type = "submit">Submit</button>
          <button style = {buttonStyle} onClick={this.hide}>Cancel</button>
        </div>
      )
    }
  }

export default AddItemForm;