import React from 'react';
import {Button} from "../components/Button";
import {AddItemForm} from "../components/AddItemForm";
import {HeaderComponent} from "../components/Headers";
import {LoadOnClick} from "../components/LoadOnClick";



class MyItemsComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showForm : false
    }
    this.loadForm = this.loadForm.bind(this)
  }

  hide = () => {
    this.setState({showForm: false})
  }


  loadForm(){
    this.setState({showForm:true})
  }


  render(){
    var style = {
      dsplay: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      textAlign: 'center'
    }

    var addItemComponent
    if(!this.state.showForm){
      addItemComponent = <Button msg = "Add item" onClick = {this.loadForm}/>
    }
    else{
      addItemComponent = <AddItemForm parentCallBack = {this.hide}/>
    }

    return(
      <React.StrictMode>
        <section id = "headerWrapper">
          <HeaderComponent loadSearchBar = "N" loadMyItemsButton = "N"/> 
        </section>
        <section id = "bodyWrapper" style = {style}>
          <div id= "formWrapper" style = {{width:'60%',height: '40%',margin:'2%'}}> 
            {addItemComponent}
          </div>
          <LoadOnClick title = "My items for sale" base_url = {`shop/itemListSale/${localStorage.getItem("username")}`}/>
          <LoadOnClick title = "My bought items" base_url = {`shop/itemListBought/${localStorage.getItem("username")}`}/>
          <LoadOnClick title = "My sold items" base_url = {`shop/itemListSold/${localStorage.getItem("username")}`}/>
        </section>
        
      </React.StrictMode>
    )
  }
}
  
  export default MyItemsComponent;

