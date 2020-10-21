import React, { Component } from 'react'; 
import axios from 'axios';
import "./Login.css";
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom"

axios.defaults.baseURL = "";


export default class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);  

        this.state = {
            username: '', password: '', redirect: false
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

    onSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.username, 
            password: this.state.password
        }

        console.log(user); 

        axios.post('http://localhost:5000/users/login', user)
            .then(res => {
                sessionStorage.setItem("username", res.data.name);
                axios.get('http://localhost:5000/users/cart')
                    .then(res => { 
                        sessionStorage.setItem("cartLength", res.data.length);
                    });  
                
                this.setState({redirect: true}); 
            }); 
        
        this.setState({
            username: this.state.username,
            password: this.state.password
        })
    }

    render() {
        if (this.state.redirect)
            return <Redirect to='/'/>

        return (
            <div className = "login"> 
                  {/* Logo */}
                <Link to = "/">

                     <img className = "login__logo" src = "https://res.cloudinary.com/duzmuxrsw/image/upload/v1603088411/APLogo_tf5axm.png" alt = "" />

                </Link>

                <div className = "login__container">

                    <h1>
                        Sign in
                    </h1>

                    <form onSubmit={this.onSubmit}>
                        <h5>
                            Email
                        </h5>
                        <input type="text" id="email" placeholder="Email" onChange={this.onChangeUsername}></input>     
                        <h5>
                            Password
                        </h5>
                        <input type="password" id="password" placeholder="Password" onChange={this.onChangePassword}></input> 
                        <button className = "login__submit" id="submit" type="submit">Submit</button>
                    </form>
                </div>      
            </div>
        )
    }
}
