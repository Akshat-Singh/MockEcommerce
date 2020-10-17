import React, { Component } from 'react'; 
import axios from 'axios';
import Header from '../Header'; 

axios.defaults.baseURL = "";
axios.defaults.withCredentials = true; 

export default class UserProfile extends Component {

    state = {
        
    }

     componentWillMount() {
        axios.get('http://localhost:5000/users/profile')
            .then(res => {
                this.setState(res.data); 
                console.log(this.state); 

            })
            .catch(err => console.log(err)); 
    }

    
   
    render() {
        return (
            <div>
                <Header/>
                <h1>Personal Details</h1>
            
                    <form> 
                        <div> 
                            Name
                            <input type="text" placeholder={this.state['name']} disabled="disabled"/>
                            Email
                            <input type="text" placeholder={this.state['email']} disabled="disabled"/>
                            Password
                            <input type="password" placeholder="" disabled="disabled"/>
                            Confirm Password
                            <input type="password" placeholder="" disabled="disabled"/>
                            <button>Edit information</button> 
                        </div>
                    </form>
            </div> 
        )
    }
}
