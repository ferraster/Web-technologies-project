import React from "react";
import {ItemList} from "./ItemList";

export class ItemListSearchLoggedWrapper extends React.Component{
    render(){
        return(
            <ItemList key = {Math.random().toString()} base_url= {`shop/itemListSearchLogged/${this.props.search}/${localStorage.getItem("username")}`}/>
        )
    }
}

export class ItemListSearchWrapper extends React.Component{
    render(){
        return(
            <ItemList key = {Math.random().toString()} base_url= {`shop/itemListSearch/${this.props.search}`}/>
        )
    }
}