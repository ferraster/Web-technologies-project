import React from "react";
import ReactDOM from "react-dom";
import {ItemList} from "./ItemList"

export class SearchBar extends React.Component{
    constructor(props){
      super(props)
  
      this.loadSearch = this.loadSearch.bind(this)
    }
  
  
    loadSearch = (event) => {
      event.preventDefault()
      this.props.parentCallBack(document.getElementById("search").value)
    }
    
    render(){
      var parentFormStyle= {

      }

      var searchbarStyle = {
        labelStyle:{
          color: 'yellow'
        },
        inputStyle:{
          boxShadow: '1px 1px yellow yellow',
          backgroundColor: 'black',
          color: 'yellow'
        },
        buttonStyle:{
          boxShadow: '1px 1px yellow',
          backgroundColor: 'black',
          color: 'yellow'
        }
      }
  
      return(
        <section id = "searchbar" style = {{...this.props.style,parentFormStyle}}>
          <form onSubmit={this.loadSearch} method = 'GET'>
            <label id = "label" for = "user" style = {searchbarStyle.labelStyle}>Search:</label>
            <input type= 'text' name = "user" id = "search" style = {searchbarStyle.inputStyle}/>
            <button type = "submit" style = {searchbarStyle.buttonStyle} onclick = {this.loadSearch}>Search</button>
          </form>
        </section>
      ) 
    }
  }

  export class SearchBarLogged extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        count : 0
      }

      this.loadSearch = this.loadSearch.bind(this)
    }
  
  
    loadSearch = (event) => {
      event.preventDefault()
      this.props.parentCallBack(document.getElementById("search").value)
    }
 
    
    render(){
      var parentFormStyle= {

      }

      var searchbarStyle = {
        labelStyle:{
          color: 'yellow'
        },
        inputStyle:{
          boxShadow: '1px 1px yellow yellow',
          backgroundColor: 'black',
          color: 'yellow'
        },
        buttonStyle:{
          boxShadow: '1px 1px yellow',
          backgroundColor: 'black',
          color: 'yellow'
        }
      }
  
      return(
        <section id = "searchbar" style = {{...this.props.style,parentFormStyle}}>
          <form onSubmit={this.loadSearch}>
            <label id = "label" for = "user" style = {searchbarStyle.labelStyle}>Search:</label>
            <input type= 'text' name = "user" id = "search" style = {searchbarStyle.inputStyle}/>
            <button type = "submit" style = {searchbarStyle.buttonStyle} onclick = {this.loadSearch}>Search</button>
          </form>
        </section>
      ) 
    }
  }
  
export default SearchBar  