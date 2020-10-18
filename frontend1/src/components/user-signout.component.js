import React, { Component } from 'react'; 
import axios from 'axios';
import {Redirect} from "react-router-dom"


export default class UserSignout extends Component {
    
    componentWillMount() {
        sessionStorage.removeItem("username");
        axios.get("http://localhost:5000/users/signout")
            .then(() => {
                alert("You're now signed out"); 
            }) 
    }
    
    render() {
        return <Redirect to='/'/>
    }
}
