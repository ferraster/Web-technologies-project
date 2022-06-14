import React from "react";
import ReactDOM from "react-dom"
import Button from "./Button";
import { axiosInstance } from "../axios";

export class Item extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showEditForm : false,
      change: false
    }
    this.toggleEditPrice = this.toggleEditPrice.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.itemInCart = this.itemInCart.bind(this)
    this.hideEditPrice = this.hideEditPrice.bind(this)
  }

  hideEditPrice = () => {
    this.setState({showEditForm: false})
  }

  itemInCart= (title) => {
    if(localStorage.getItem("cart") == null){
      return false
    }
    else{
      var items = localStorage.getItem("cart").split("%")
      for(let i = 0; i<items.length;i++){
        let prop = items[i].split(":")
        if(prop[0] == title){
          return true
        }  
      }
      return false
    }
  }

  addToCart = () => {
    if(localStorage.getItem("cart") == null){
      localStorage.setItem("cart",`${this.props.title}:${this.props.owner}:${this.props.price}:${this.props.status}`)
    }
    else{
      if(!this.itemInCart(this.props.title)){
        localStorage.setItem("cart", localStorage.getItem("cart") + `%${this.props.title}:${this.props.owner}:${this.props.price}:${this.props.status}`)
      }
    }  
    this.setState({change:!this.state.change})  
  }


  toggleEditPrice = () => {
    this.setState({showEditForm : true})
  }

  render(){

    var itemStyle = {
      parentItemStyle:{
        borderStyle: 'solid',
        borderColor: '#73093a',
        backgroundColor: '#100d26',
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        color: '#ffffff',
        margin: '2%',
        padding: '2%'
      },
      imgStyle: {
        maxWidth: '100%',
        maxHeigth: '100%',
        width: '10%',
        height: '20%',
      },
      textBoxStyle:{
        display: 'flex',
        flexDirection: 'column'
      },
      emStyle: {
        color: '#f2d649'
      },
      titleStyle:{
        marginLeft: '20px',
        color:'red',
        borderStyle: 'solid',
        borderColor: 'red',
        padding: '1%',
        textAlign: 'center',
        width: '70%'
      }
    }

    var status = null

    if(this.props.status == 'S'){
      status = <h3 style = {itemStyle.titleStyle}>SOLD</h3>
      if(this.props.owner == localStorage.getItem("username")){
        status = <h3 style = {itemStyle.titleStyle}>BOUGHT</h3>
      }
    }
    else if(this.props.status == 'U' && localStorage.getItem("username") != null && this.props.owner != localStorage.getItem("username")){ 
      if(!this.itemInCart(this.props.title))
        status = <Button onClick = {this.addToCart} msg= "Add to cart"/>
      else{
        status = <h3 style = {itemStyle.titleStyle}>ADDED TO CART</h3>
      }
    }
    else if(this.props.owner == localStorage.getItem("username") && this.props.status == 'U' )
    {
      status = <Button onClick = {this.toggleEditPrice} msg= "Edit price"/>
    }

    if(this.state.showEditForm){
      status = <EditPriceForm title = {this.props.title} parentCallBack = {this.hideEditPrice}/>
    }
      
    var outsideStyle = this.props.style
    return(
      <div style = {{...itemStyle.parentItemStyle,...outsideStyle}}> 
        <div style = {itemStyle.textBoxStyle}> 

          <div> 
            <em style = {itemStyle.emStyle}>Title: </em>{this.props.title}
          </div>
          <div>
            <em style = {itemStyle.emStyle}>Description: </em><p>{this.props.description}</p>
          </div>
          <div>
            <em style = {itemStyle.emStyle}>Price: </em>{this.props.price}
          </div>
          <div>
            <em style = {itemStyle.emStyle}>Date of publication: </em>{this.props.date_pub}
          </div>
          <div>
            <em style = {itemStyle.emStyle}>Time of publication: </em>{this.props.time_pub}
          </div>

        </div>  
        
        <div id="state">
          {status}
        </div>
      </div>
    )
  }
}


  export class EditPriceForm extends React.Component{
    constructor(props){
      super(props)
      this.onSubmit = this.onSubmit.bind(this)
    }

    hide = () => {
      this.props.parentCallBack()
    }

    onSubmit = (event) => {
      event.preventDefault()

      var price = document.getElementById("PriceInput").value
      if(price < 0){
        alert("Price cannot be negative")
      }
      else{
        var payload = {
          title:this.props.title,
          newPrice:price
        }

       axiosInstance
       .post('shop/setPrice/',payload)
       .then((e) =>{
         document.location.reload()
       })
      }
    }
    
    render(){ 

      var inputStyle= {
        backgroundColor: 'black',
        borderStyle: 'solid',
        borderColor: 'yellow',
        color: '#f2d649',
      }
      var ButtonStyle= {
        backgroundColor: '#100d26',
        borderStyle: 'solid',
        borderColor: '#f2d649',
        color: '#f2d649',
      }

      return(
        <form id= "EditPriceForm" method = "POST" onSubmit={this.onSubmit}>
            <input  style = {inputStyle} id = "PriceInput" type = "number"/>
            <button style = {ButtonStyle} type = "submit" >Edit</button>
            <button style = {ButtonStyle} onClick={this.hide} >Cancel</button>
        </form>
      )
    }
  }

export default Item
  