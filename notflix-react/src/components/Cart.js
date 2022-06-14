import React from "react";
import Button from "./Button";
import {axiosInstance} from "../axios"

export class Cart extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            change : false,
            numInvalidItems : this.countSoldItems()
        }
        this.removeAll = this.removeAll.bind(this)
        this.updateState = this.updateState.bind(this)
        this.pay = this.pay.bind(this)
        this.countSoldItems = this.countSoldItems.bind(this)
    }

    removeAll = () => {
        localStorage.removeItem("cart")
        this.setState({change:!this.state.change})
    }

    countSoldItems = () => {
        if(localStorage.getItem("cart") != null){
            var count = 0
            var cart = localStorage.getItem("cart").split("%")
            for(let i = 0; i< cart.length;i++){
                var props = cart[i].split(":")
                if(props.length > 4){
                    if(props[4] == "SOLD"){
                        count++
                    }
                }
            }
            return count
        }
        else{
            return 0
        }
    }

    

    pay = () => {
        if(this.state.numInvalidItems == 0){
            var payload = {}
            var cart = localStorage.getItem("cart").split("%")
            for(let i = 0; i< cart.length; i++ ){
                var props = cart[i].split(":")

                var item = {
                    title   : props[0],
                    owner   : props[1],
                    price   : props[2],
                    status  : props[3],
                    buyer   : localStorage.getItem("username"),
                } 
                payload[i] = item
            }

            axiosInstance
                .post('shop/pay',payload)
                .then((response) => {
                    if(response.data['success']){
                        localStorage.removeItem("cart")
                        alert("Successful payment")
                        this.setState({change: !this.state.change})
                    }
                    else{
                        var numInvalidItems = 0

                        alert("Your cart is no longer up to date, review the changes please")
                        
                        var changes = String(response.data['msg']).split("%")
                       
                        for(let i = 0; i< changes.length;i++){
                           
                            var change_prop = changes[i].split(":")
                            var title   = change_prop[0]
                            var change  = change_prop[1]

                            if(change == "SOLD"){

                                numInvalidItems ++
                                var cart = localStorage.getItem("cart").split("%")
                                var finalCart = ""
                                for(let i = 0; i<cart.length;i++){
                                    var props = cart[i].split(":")
                                    if(props[0] == title){
                                        cart[i] = cart[i] +":SOLD"
                                    }
                                    finalCart = finalCart+"%"+cart[i]
                                }
                                finalCart = finalCart.substring(1)
                                localStorage.setItem("cart",finalCart)
                            }
                            else{

                                var cart = localStorage.getItem("cart").split("%")
                                var finalCart = ""
                                for(let i = 0; i<cart.length;i++){
                                    var props = cart[i].split(":")
                                    if(props[0] == title){
                                        props[2] = change.split("=")[1]
                                        cart[i] = props[0] +":"+ props[1] + ":" + props[2] + ":" + props[3] + ":NEWPRICE"  
                                    }
                                    finalCart = finalCart+"%"+cart[i]
                                }
                                finalCart = finalCart.substring(1)
                                localStorage.setItem("cart",finalCart)
                            }
                            this.setState({numInvalidItems: numInvalidItems})
                        }
                    }
                })
        }
        else{
            alert("Your cart is invalid. Payment is not possible")
        }
    }

    updateState = (data) => {
        if(data){
            this.setState({numInvalidItems: this.state.numInvalidItems-1})
        }
        else{
            this.setState({change: !this.state.change})
        }
    }


    render(){

        var cartStyle = {
            tableStyle:{
                color: 'yellow',
                width: '70%',
                heigth: '300px',
                border: '1px solid #73093a',
                marginTop: '3%'
            }
        }
        var totalPriceStyle = {
            borderStyle : 'solid',
            borderCorlor: '#73093a',
            color : '#f2d649',
            width: '70%',
            marginTop: '5%',
            marginBottom: '5%'
        }
        
        if(localStorage.getItem("cart") != null){
            var cart = localStorage.getItem("cart").split("%")
           
            var renderData = []
            var totalPrice = 0 
            
            for(let i = 0; i<cart.length;i++){

                var etiquette = null
                var removeInvalid = false
                var props = cart[i].split(":")
                if(props.length > 4){
                    if(props[4] == "SOLD"){
                        removeInvalid = true
                        etiquette = <div style = {{color: 'red'}}>   SOLD</div>
                    }
                    else{
                        etiquette = <div style = {{color: 'red'}}>   NEW PRICE</div>
                    }
                }
                totalPrice = totalPrice + parseFloat(props[2])
        
                renderData.push(
                    <Row title = {props[0]} price = {props[2]} parentCallBack = {this.updateState} etiquette = {etiquette} invalid = {removeInvalid}/>
                )
            }

            return(
                <>
                    <table style = {cartStyle.tableStyle}> 
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th><Button msg = "Remove all" onClick = {this.removeAll}/></th>
                        </tr>
                        {renderData}
                    </table>
                    <h4 style = {totalPriceStyle}>Total amount: {totalPrice}</h4>
                    <Button msg = "pay" onClick = {this.pay}/>
                </>
            )
        }
        else{
            return(
                <h2 style= {{color: '#f2d649', textAlign:'center',marginTop:'2%'}}>NO ITEMS IN THE CART</h2>
            )
        }
    }
}


class Row extends React.Component{
    constructor(props){
        super(props)

        this.removeFromCart = this.removeFromCart.bind(this)
    }

    removeFromCart = () =>{

        var title = this.props.title

        var cart = localStorage.getItem("cart").split("%")
        var index;
        for(let i = 0; i<cart.length;i++){
            var props = cart[i].split(":")
            if(props[0] == title){
                index = i;
            }
        }
        cart.splice(index,1)
        
        var finalCart =""
        for(let i = 0; i<cart.length;i++){
            finalCart = finalCart+"%"+cart[i]
        }
        
        var stringCart = finalCart.substring(1)

        if(stringCart.length > 0){
            localStorage.setItem("cart",stringCart)
        }
        else{
            localStorage.removeItem("cart")
        }

        this.props.parentCallBack(this.props.invalid)
    }

    render(){
        return(
            <tr >
                <th>{this.props.title}{this.props.etiquette}</th>
                <th>{this.props.price}</th>
                <th ><div style = {{width: '10%',marginLeft:'45%'}}>{<Button msg = "X"  onClick = {this.removeFromCart}/>}</div></th>
            </tr>
        )
    }
}