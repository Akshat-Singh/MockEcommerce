import React, { Component } from 'react'; 
import axios from 'axios';
import Header from '../Header'; 
import {Redirect} from "react-router-dom"


axios.defaults.baseURL = "";
axios.defaults.withCredentials = true; 

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
                <h1>Personal Details</h1>
            
                    <form onSubmit={this.updateProfile}> 
                            Name
                            <input type="text" defaultValue={this.state['name']} disabled={(this.state['formFieldsDisabled'])} onChange={this.onChangeName}/>
                            Email
                            <input type="text" defaultValue={this.state['email']} disabled={(this.state['formFieldsDisabled'])} onChange={this.onChangeUsername}/>
                            Password
                            <input type="password" placeholder="Leave blank if you do not wish to change" defaultValue="" disabled={(this.state['formFieldsDisabled'])}
                                    onChange={this.onChangePassword}/>
                            Confirm Password
                            <input type="password" defaultValue="" disabled={(this.state['formFieldsDisabled'])} onChange={this.onChangeConfirmPassword}/>
                            <button onClick={this.enableAndEdit}>Edit information</button> 
                            <button type="submit" hidden={this.state['formFieldsDisabled']}>Submit Updated Information</button> 
                    </form>
            </div> 
        )
    }
}
