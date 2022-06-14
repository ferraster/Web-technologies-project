import React from "react";
import {Button} from "./Button";
import {Item} from "./Item";

export class LoadOnClick extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        show : false,
        itemList : null
      }
      this.show = this.show.bind(this)
      this.hide = this.hide.bind(this)
    }
  
    async getData(){                
      let url         = `/${this.props.base_url}/`; 
      
      const response  = await fetch(url);
      const data      = await response.json();
  
      this.setState({ itemList: data, show: true});
    }
  
  
    show(){
      this.getData()
    }
  
    hide(){
      this.setState({itemList: null, show : false})
    }
  
  
    render(){
      if(this.state.show){
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
          renderData.push( <Item style= {itemStyle} title = {aux.title} description = {aux.desc} price = {aux.price} date_pub = {aux.date_pub} time_pub = {aux.time_pub} status = {aux.status} owner = {aux.owner} prev_owner = {aux.prev_owner} edit = "Y"/>)
        }
        
        return(
            <div id = "itemList">
              <h2 style={{color:'yellow'}}>{this.props.title}</h2>
              <div id = "itemListInner" style = {itemListStyle}>
                {renderData}
              </div>
              <Button onClick = {this.hide} style = {{display: 'inline-block',width:'20%',height:'50px',marginBottom: '5%', marginTop: '5%',textAlign: 'center'}} msg = "Hide"/>
            </div>
        )
      }else{
        return(
          <>
            <h2 style={{color:'yellow'}}>{this.props.title}</h2>
            <Button onClick = {this.show} style = {{display: 'inline-block',width:'20%',height:'50px',marginBottom: '5%', marginTop: '5%',textAlign: 'center'}} msg = "Show"/>
          </>
        )
      }
  
  
    }
  }

  export default LoadOnClick