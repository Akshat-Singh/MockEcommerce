import React, { Component } from 'react'; 
import axios from 'axios';
import Header from '../Header'; 
import CartItem from '../CartItem.js'
import '../CartItem.css'

axios.defaults.baseURL = "";
axios.defaults.withCredentials = true; 

export default class UserCart extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            mdata: [],
            data: {},
            totalCost: 0
        } 

        this.placeOrder = this.placeOrder.bind(this);
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

                        let totalPrice = 0; 
                        for (var param in res_i.data) {
                            totalPrice += res_i.data[param].cost;
                        }

                        this.setState({totalCost: totalPrice}); 
                        console.log(totalPrice); 
                    })

            })
            .catch(err => console.log(err)); 
    }    
   
    placeOrder(e) {
        e.preventDefault();     

        axios.get('http://localhost:5000/users/purchase')
            .then(res => {
                alert(JSON.stringify(res.data)); 
                axios.get('http://localhost:5000/users/cart')
                .then(res => { 
                    sessionStorage.setItem("cartLength", res.data.length);
                });
                window.location.reload(); 
            })
            .catch(err => console.log(err)); 
    }

    render() {
        return (
            <div>
                <Header/>
                <div className = "cart">
                    <table className = "cart__table">
                        {this.state.mdata.map((data, index) => ( 
                            <CartItem 
                                title = {data['itemName']}
                                description = {data.description}
                                price = {data.cost}
                                image = {data['imageLink']}
                                category = {data.category}
                                id = {data._id}
                            />
                        ))}
                        <tr>
                            <td></td> 
                            <td></td>
                            <td className = "totalcost"> <h3> Total Cost </h3></td>
                            <td> </td> 
                            <td className = "totalmoney"> <h3> ₹{this.state.totalCost} </h3></td>
                            <td className = "placeorder"> <button className = "btn btn-primary" onClick={this.placeOrder}>Place Order</button> </td> 
                        </tr>
                    </table>
                    
                </div>
            </div> 
        )
    }
}
