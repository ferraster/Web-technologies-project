
import React from 'react';
import {HeaderComponent}  from '../components/Headers'
import {ConditionalItemList} from "../components/ConditionalItemList"


class HomeComponent extends React.Component{
  constructor(props){
    super(props)
    this.state={
      search : "none"
    }
    this.modifySearch = this.modifySearch.bind(this)
  }  

  modifySearch = (data) => {
    this.setState({search : data})
  }

  render(){
    
    return(
    <React.StrictMode>
      <section id = "headerWrapper">
        <HeaderComponent parentCallBack = {this.modifySearch}/> 
      </section>
      <section id = "itemListWrapper">
        <ConditionalItemList search = {this.state.search}/>
      </section>
    </React.StrictMode>
    )
  }
}

export default HomeComponent;
