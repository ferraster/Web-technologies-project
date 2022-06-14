import React from "react";
import {Item} from "./Item";
import {Button} from "./Button";
import {axiosInstance} from "../axios"


export class ItemList extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        itemList          : {},
        current_page      : 0,
        all_items_loaded  : false,
        itemList_empty    : false
      };
  
      this.loadMore = this.loadMore.bind(this)
    }
    
    async getData(){                
      let url         = `/${this.props.base_url}/${this.state.current_page}`; 
      
      const response  = await fetch(url);
      const data      = await response.json();
  
  
      var currentItems  = this.state.itemList;
      var nextItems     = data;
      this.setState({ itemList: {...currentItems,...nextItems}});
      this.setState({ current_page: this.state.current_page+1})
      
      if(Object.keys(this.state.itemList).length == 0){
        this.setState({itemList_empty: true})
      }
  
    }
  
    loadMore(){
      this.getData()
    }
  
    async componentDidMount(){
      this.getData()
    }
  
    render(){

      var itemListStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: '#100d26'
      }
  
      var itemStyle = {
        width: '40%',
        justifyContent: 'space-between'
      }
  
      var renderData  = [];
      var index       = {};
      var end_page;    
  
      
      for (index in this.state.itemList){
        if(index != 'end_items'){
          let aux = this.state.itemList[index]
          renderData.push( <Item style= {itemStyle} title = {aux.title} description = {aux.desc} price = {aux.price} date_pub = {aux.date_pub} time_pub = {aux.time_pub} status = {aux.status} owner = {aux.owner}/>)
        }
        else{
          end_page = this.state.itemList[index]
        } 
      }
      
      var display_none = (end_page || Object.keys(this.state.itemList).length == 0) ? 'none' : '';
      
      return(
      <>
      <h2 style={{color:'yellow'}}>{this.props.title}</h2>
      <div id = "itemList">
        <div id = "itemListInner" style = {itemListStyle}>
          {renderData}
        </div>
        <div id = "button" style = {{display: display_none,textAlign:'center'}}>
          <Button onClick = {this.loadMore} style = {{display: 'inline-block',width:'20%',height:'50px',marginBottom: '5%', marginTop: '5%'}} msg = "Load more"/>
        </div>
      </div>
      </>
      )
    }
  }

  export class ItemListAll extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        itemList          : null,
      };
    }
    
    async getData(){                
      let url         = `/${this.props.base_url}/`; 
      
      const response  = await fetch(url);
      const data      = await response.json();
  
  
      var currentItems  = this.state.itemList;
      var nextItems     = data;
      this.setState({ itemList: data});
  
    }
  
    async componentDidMount(){
      this.getData()
    }
  
    render(){
  
      var itemListStyle = {
        
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: '#100d26'
      }
  
      var itemStyle = {
        width: '40%'
      }
  
      var renderData  = [];
  
      var index
      for (index in this.state.itemList){
        let aux = this.state.itemList[index]
        renderData.push( <Item style= {itemStyle} title = {aux.title} description = {aux.desc} price = {aux.price} date_pub = {aux.date_pub} time_pub = {aux.time_pub} status = {aux.status} owner = {aux.owner}/>)
      }
      
      return(
      <>
      <h2 style={{color:'yellow'}}>{this.props.title}</h2>
      <div id = "itemList">
        <div id = "itemListInner" style = {itemListStyle}>
          {renderData}
        </div>
      </div>
      </>
      )
    }
  }
  
  
  



export default ItemList