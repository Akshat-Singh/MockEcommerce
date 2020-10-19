import React, { Component } from 'react'; 
import axios from 'axios';
import Header from '../Header'; 
import Purchase from './Purchases.js'
import './Purchases.css'

axios.defaults.baseURL = "";
axios.defaults.withCredentials = true; 

export default class UserPurchases extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            purchases: [], 
            mdata: []
        } 
    }

    componentWillMount() {
        axios.get('http://localhost:5000/users/profile/purchases')
            .then(res => {
                console.log(res.data); 
                this.setState({data: res.data});
                let purchase_data = {"data": this.state.data}
                axios.post('http://localhost:5000/shop/getProducts', purchase_data)
                    .then(res_i => {
                        console.log(res_i.data); 
                        this.setState({mdata: res_i.data}); 
                    }) 
            })
            .catch(err => console.log(err)); 
    }    
   
    render() {
        return (
            <div className="purchases">
                <Header/>
                <h1>My Purchases</h1>
                <div>
                    <table>
                        {this.state.mdata.map((data, index) => ( 
                            <Purchase 
                                title = {data['itemName']}
                                description = {data.description}
                                price = {data.cost}
                                image = {data['imageLink']}
                                category = {data.category}
                                id = {data._id}
                            />
                        ))}
                    </table>
                </div>
            </div> 
        )
    }
}
