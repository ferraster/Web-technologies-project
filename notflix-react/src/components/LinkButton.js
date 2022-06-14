import React from "react"
import {Link} from "react-router-dom";


export class LinkButton extends React.Component{
    render(){
      var buttonStyle={
        backgroundColor: '#100d26',
        borderStyle: 'solid',
        borderColor: '#f2d649',
        color: '#f2d649',
        height: '100%',
        width: '100%',
      }
      var aStyle = {
        paddingTop: 0,
        paddingBottom: 0
      }
  
      return(
        <Link to = {this.props.to} onClick = {this.props.onClick} style = {aStyle,this.props.style}><button style = {buttonStyle} >{this.props.msg}</button></Link>
      )
    }
  }

export default LinkButton