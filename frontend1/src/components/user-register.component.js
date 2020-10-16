import React, { Component } from 'react'; 
import axios from 'axios';
import {GoogleLogin} from "react-google-login";

axios.defaults.baseURL = "";

const responseGoogle = response => {
    console.log(response);
};

export default class UserRegister extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);  
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

        this.state = {
            username: '', password: '', confirm_password: ''
        }
    }    

    onChangeUsername(e) {
        this.setState({
          username: e.target.value 
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangeConfirmPassword(e) {
        this.setState({
            confirm_password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.confirm_password !== this.state.password)
            console.log("Passwords do not match!"); 

        else {
            const user = {
                name: this.state.username, 
                email: this.state.username, 
                password: this.state.password,
            }

            console.log(user); 

            axios.post('http://localhost:5000/users/register', user)
                .then(res => console.log(res.data)); 
            
            this.setState({
                username: '',
                password: ''
            })
        }
    }

    render() {
        return (
            <div> 
                <h1> Register page </h1>

                <form onSubmit={this.onSubmit}>
                    <input type="text" id="email" placeholder="Email" onChange={this.onChangeUsername}></input> 
                    <input type="password" id="password" placeholder="Password" onChange={this.onChangePassword}></input>
                    <input type="confirm-password" id="confirm-password" placeholder="Confirm Password" onChange={this.onChangeConfirmPassword}></input> 
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
