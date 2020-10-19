import React, { Component } from 'react'; 
import axios from 'axios';
import Header from '../Header'; 
import WishlistItem from '../WishlistItem.js'
import '../WishlistItem.css'

axios.defaults.baseURL = "";
axios.defaults.withCredentials = true; 

export default class UserWishlist extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            mdata: [],
            data: {}
        } 
    }

    componentWillMount() {
        axios.get('http://localhost:5000/users/wishlist')
            .then(res => {
                this.setState({data: JSON.parse(JSON.stringify(res.data))}); 

                let wishlist_info = {"data": this.state.data}; 
                console.log(wishlist_info); 
                axios.post('http://localhost:5000/shop/getProducts', wishlist_info)
                    .then(res_i => {
                        console.log(res_i.data); 
                        this.setState({mdata: res_i.data}); 
                    })
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
                            <WishlistItem 
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
