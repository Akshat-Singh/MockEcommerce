import React, { Component } from 'react'; 
import axios from 'axios';
import {GoogleLogin} from "react-google-login";

const responseGoogle = response => {
    console.log(response);
};

export default class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username, 
            password: this.state.password
        }

        axios.post('http//localhost:5000/users/login', user)
            .then(res => console.log(res.data)); 
        
        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div> 
                <h1> Login page </h1>

                <form onSubmit={this.onSubmit}>
                    <input type="text" id="email" placeholder="Email"></input> 
                    <input type="password" id="password" placeholder="Password"></input> 
                    <button id="submit" type="submit">Submit</button>
                </form>
                <GoogleLogin
                    clientId = "741110853489-3h88ghsg0u7qmjsjs6856g132dt9l5nk.apps.googleusercontent.com"
                    onSuccess = {responseGoogle}
                    onFailure = {responseGoogle}
                />
            </div>
        )
    }
}
