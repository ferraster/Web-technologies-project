import React from 'react';



export class Button extends React.Component{
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
        <a href = {this.props.href} onClick={this.props.onClick} style = {aStyle,this.props.style}><button id = "_Button" style = {buttonStyle} >{this.props.msg}</button></a>
      )
    }
}

export default Button
