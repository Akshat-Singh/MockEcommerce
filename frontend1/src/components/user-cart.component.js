import React, { Component } from 'react'; 
import axios from 'axios';
import Header from '../Header'; 
import WishlistItem from '../CartItem.js'
import '../CartItem.css'

axios.defaults.baseURL = "";
axios.defaults.withCredentials = true; 

export default class UserCart extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            mdata: [],
            data: {}
        } 
    }

    componentWillMount() {
        axios.get('http://localhost:5000/users/cart')
            .then(res => {
                this.setState({data: JSON.parse(JSON.stringify(res.data))}); 

                let cart_info = {"data": this.state.data}; 
                console.log(cart_info); 
                axios.post('http://localhost:5000/shop/getProducts', cart_info)
                    .then(res_i => {
                        console.log(res_i.data); 
                        this.setState({mdata: res_i.data}); 
                    })
            })
            .catch(err => console.log(err)); 
    }    
   
    render() {
        return (
            <div class="cart">
                <Header/>
                <h1>My Cart</h1>
                <div>
                    <table>
                        {this.state.mdata.map((data, index) => ( 
                            <WishlistItem 
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
