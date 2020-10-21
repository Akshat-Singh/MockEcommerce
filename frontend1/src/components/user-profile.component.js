import React, { Component } from 'react'; 
import axios from 'axios';
import Header from '../Header'; 
import {Redirect} from "react-router-dom";
import {Link} from "react-router-dom";
import {GoogleLogin} from "react-google-login";
import "./Login.css";


axios.defaults.baseURL = "";
axios.defaults.withCredentials = true; 
const responseGoogle = response => {
    console.log(response);
};

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.enableAndEdit = this.enableAndEdit.bind(this);
        this.updateProfile = this.updateProfile.bind(this); 
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);  
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

        this.state = {
            formFieldsDisabled: true, 
            username: '', 
            password: '', 
            name: '',
            confirm_password: '', 
            redirect: false
        }
    }

     componentWillMount() {
        axios.get('http://localhost:5000/users/profile')
            .then(res => {
                this.setState(res.data);
                this.setState({ 
                    username: res.data.email,
                    name: res.data.name
                }) ;
                console.log(this.state); 


            })
            .catch(err => console.log(err)); 
    }

    enableAndEdit(e) {
        e.preventDefault(); 
        this.setState({formFieldsDisabled: false}); 
    }
    
    updateProfile(e) {
        e.preventDefault(); 
        
        if (this.state.password !== this.state.confirm_password)
            alert("Passwords Do Not Match"); 
        else {
            let updateInfo = {
                "name": this.state.name, 
                "email": this.state.username, 
                "password": this.state.password
            }

            axios.post('http://localhost:5000/users/profile', updateInfo)
                .then(res => {  
                    alert(res.data);
                    sessionStorage.setItem("username", this.state.name);
                    this.state.redirect = true;
                    
                })
                .catch(err => console.log(err))
        }
    }

    onChangeName(e) {
        this.setState({name: e.target.value})
    }

    onChangeUsername(e) {
        this.setState({username: e.target.value})
    }

    onChangePassword(e) {
        this.setState({password: e.target.value})
    }

    onChangeConfirmPassword(e) {
        this.setState({confirm_password: e.target.value})
    }
   
    render() {
        if (this.state.redirect)
            return <Redirect to='/users/profile'/> 

        return (
            <div>
                <Header/>
                <div class = "login">

                    {/* Logo */}
                    <Link to = "/">

                        <img className = "login__logo" src = "https://res.cloudinary.com/duzmuxrsw/image/upload/v1603088411/APLogo_tf5axm.png" alt = "" />

                    </Link> 

                    <div className = "login__container">
                        <h1>Personal Details</h1>
                    
                        <form onSubmit={this.updateProfile}> 

                            <h5>
                                Name
                            </h5>
                                    
                            <input type="text" defaultValue={this.state['name']} disabled={(this.state['formFieldsDisabled'])} onChange={this.onChangeName}/>
                            <h5>
                                Email
                            </h5>
                            <input type="text" defaultValue={this.state['email']} disabled={(this.state['formFieldsDisabled'])} onChange={this.onChangeUsername}/>
                            <h5>
                                Password
                            </h5>
                            <input type="password" placeholder="Leave blank if you do not wish to change" defaultValue="" disabled={(this.state['formFieldsDisabled'])}
                                            onChange={this.onChangePassword}/>
                            <h5>
                                Confirm Password
                            </h5>
                            <input type="password" defaultValue="" disabled={(this.state['formFieldsDisabled'])} onChange={this.onChangeConfirmPassword}/>
                            <button className = "login__submit" onClick={this.enableAndEdit}>Edit information</button> 
                            <button className = "login__submit" type="submit" hidden={this.state['formFieldsDisabled']}>Submit Updated Information</button> 
                        </form>

                        <GoogleLogin className = "login__google"
                        clientId = "741110853489-3h88ghsg0u7qmjsjs6856g132dt9l5nk.apps.googleusercontent.com"
                        onSuccess = {responseGoogle}
                        onFailure = {responseGoogle}
                        />

                    </div>
                </div>
            </div> 
        )
    }
}
