import React, { Component } from 'react'; 
import axios from 'axios';
import Header from '../Header.js'

axios.defaults.baseURL = "";
axios.defaults.withCredentials = true; 

export default class UserCart extends Component {

    state = {
        
    }

    componentWillMount() {
        axios.get('http://localhost:5000/users/cart')
            .then(res => {
                this.setState(JSON.parse(JSON.stringify(res.data))); 
                console.log(this.state);

            })
            .catch(err => console.log(err)); 
    }
    
   
    render() {
        return (
            <div>
                <Header/>
                <h1>My Cart</h1>
                {
                    Object.keys(this.state).map((key, val) => (
                        <p key={val}>
                            <span>Key: {key}</span>
                            <span>Value: {this.state[key]}</span>
                        </p> 
                    ))
                }
            </div> 
        )
    }
}
