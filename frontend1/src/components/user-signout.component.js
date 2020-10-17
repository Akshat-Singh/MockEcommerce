import React, { Component } from 'react'; 
import axios from 'axios';


export default class UserSignout extends Component {
    componentWillMount() {
        sessionStorage.setItem("username", null);
        axios.get("http://localhost:5000/users/signout")
            .then(() => {
                console.log("Signed Out"); 
            }) 
    }
    
    render() {
        return (
            <h1>Signed Out</h1>
        )
    }
}
