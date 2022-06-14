import React from 'react'
import {ItemList}  from './ItemList'
import { ItemListSearchLoggedWrapper, ItemListSearchWrapper,ItemLustSearchLoggedWrapper } from './ItemListSearchWrapper'


export class ConditionalItemList extends React.Component{
  constructor(props){
    super(props)
  }
  
  render(){
    var user = localStorage.getItem("username")
    if(user == null){
      return <ItemListSearchWrapper search = {this.props.search}/>//<ItemList base_url = "shop/itemList"/>
    }
    else{
      return <ItemListSearchLoggedWrapper search = {this.props.search}/>//<ItemList base_url = {url}/>
    }
  }
}

export default ConditionalItemList