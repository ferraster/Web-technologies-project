import React from "react";
import {LinkButton} from "./LinkButton";
import {Button} from "./Button";
import {SearchBar, SearchBarLogged} from "./SearchBar";
import logo from "../imgs/logo.png"; 
import {axiosInstance} from "../axios"



export class HeaderComponent extends React.Component{
  constructor(props){
    super(props)
    this.modifySearch = this.modifySearch.bind(this)
  }


  modifySearch = (data) =>{
    this.props.parentCallBack(data)
  }
  

  render(){
    var user = localStorage.getItem("username")
    var component 
    if(user == null){
      component = <HomeHeader parentCallBack = {this.modifySearch}/>
    }
    else{
      component = <LoggedHeader loadCartButton = {this.props.loadCartButton} loadMyItemsButton = {this.props.loadMyItemsButton}  loadEditPassButton = {this.props.loadEditPassButton} loadSearchBar = {this.props.loadSearchBar} parentCallBack = {this.modifySearch} />
    }
    return(component)
  }
}



export class HomeHeader extends React.Component{
  constructor(props){
    super(props)
    this.modifySearch = this.modifySearch.bind(this)
  }


  modifySearch = (data) =>{
    this.props.parentCallBack(data)
  }
  
  
  render(){
  
    var headerStyle={
      parentHeaderStyle: {
        width : '99.7%',
        height: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderStyle: 'solid',
        borderColor: '#73093a',
        backgroundColor: '#100d26',
      },
      searchBarStyle: {
        flex: '4',
        paddingLeft: '10%',
        paddingTop: '5%'
      },
      innerButtonStyle:{
        marginTop: '5%',
        marginBottom: '5%',

        flex: '2'
      },
      imgWrapperStyle:{
        flex: '1'
      },
      imgStyle: {
        maxWidth: '100%', 
        width: '100%', 
        height: '60%',
        marginTop: '2.5%'
      },
    }

    return(
      <div id = "header" style = {headerStyle.parentHeaderStyle} >
        <a id = "imgWrapper" style = {headerStyle.imgWrapperStyle} href = "http://localhost:8000/shop">
          <img style = {headerStyle.imgStyle} src = {logo}/>
        </a>
        <SearchBar style = {headerStyle.searchBarStyle} parentCallBack = {this.modifySearch} />
        <LinkButton to= "/login" msg = "Sign In" style = {headerStyle.innerButtonStyle}/>
        <LinkButton to= "/signup/" msg = "Sign Up" style = {{...headerStyle.innerButtonStyle,marginLeft:10,marginRight:10}}/>
      </div>
    )
  }
}






export class LoggedHeader extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      logged : true
    }
    this.logOut = this.logOut.bind(this)
    this.modifySearch = this.modifySearch.bind(this)
  }

  modifySearch = (data) =>{
    this.props.parentCallBack(data)
  }


  logOut = (event) => {
    axiosInstance.post('/shop/logout',{refresh_token : localStorage.getItem('refresh_token')})
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem('username');
    axiosInstance.defaults.headers['Authorization'] = null;
    window.location.href = "http://localhost:8000/shop/";
  }
  
  render(){
  
    var headerStyle={
      imgStyle: {
        maxWidth: '100%', 
        width: '40%', 
        height: '60%',
        marginTop: '2.5%'
      },
      parentHeaderStyle: {
        width : '99.7%',
        height: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderStyle: 'solid',
        borderColor: '#73093a',
        backgroundColor: '#100d26',
      },
      searchbarStyle: {
        flex:'3',
        paddingTop:'5%'
      },
      innerButtonStyle:{
        marginTop: '3%',
        marginBottom: '3%',
        marginLeft:10,
        marginRight:10,
        height: '35px',
        flex: '1',
      },
      navBarStyle:{
        display:'flex',
        flexDirection: 'row',
      },

      pannelStyle:{
        width: '20%',
        flex:'3'
      },
      imgContainerStyle:{
        flex:'1',
        textAlign: 'center'
      },
      usernamecartPannelStyle:{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-evenly'
      },
      titleStyle:{
        marginLeft: '20px',
        color:'yellow',
        borderStyle: 'solid',
        borderColor: 'yellow',
        padding: '1%',
        flex:'3',
        textAlign: 'center'
      },
      cartButtonStyle:{
        marginTop: '5%',
        marginBottom: '1%',
        marginLeft:10,
        marginRight:10,
        width: '10%',
        flex: '1',
      }
    }

    var searchBar           = <SearchBarLogged style = {headerStyle.searchbarStyle} parentCallBack = {this.modifySearch}/>;
    var loadEditPassButton  = <LinkButton to= "/account" msg = "Edit password" style = {headerStyle.innerButtonStyle}/>;
    var loadMyItemsButton   = <LinkButton to= "/myitems" msg = "My items" style = {headerStyle.innerButtonStyle}/>;
    var cartButton          = <LinkButton to= "/cart" msg = "Cart" style = {headerStyle.innerButtonStyle}/>
    
    if(this.props.loadSearchBar == "N"){
      searchBar = null;
    }
    if(this.props.loadEditPassButton == "N"){
      loadEditPassButton = null;
    }
    if(this.props.loadMyItemsButton == "N"){
      loadMyItemsButton = null;
    }
    if(this.props.loadCartButton == "N"){
      cartButton = null;
    }

    return(
      <div id = "header" style = {headerStyle.parentHeaderStyle} >
        <a style = {headerStyle.imgContainerStyle} href = "http://localhost:8000/shop">
          <img style = {headerStyle.imgStyle} src = {logo}/>
        </a>
        <div style = {{paddingTop: '2%',paddingLeft:'2%'}}>
          {searchBar}
        </div>
        <section id = "pannel" style = {headerStyle.pannelStyle}>
          <div style = {headerStyle.usernamecartPannelStyle}>
            <h3 style = {headerStyle.titleStyle}>{localStorage.getItem("username")}</h3>
            {cartButton}
          </div>
          <div id="nav_bar" style = {headerStyle.navBarStyle}>
            {loadEditPassButton}
            {loadMyItemsButton}
            <LinkButton onClick= {this.logOut} to="/shop/"  msg = "Log out" style = {headerStyle.innerButtonStyle}/>
          </div>
        </section>
      </div>
    )
  }
}
