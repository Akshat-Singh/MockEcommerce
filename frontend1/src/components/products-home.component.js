import React, { Component } from 'react'; 
import axios from 'axios';
import Header from "../Header";
import Product from '../Product.js';
import '../Product.css';
import '../App.css'; 

export default class ProductsHome extends Component{

    constructor(props) {
        super(props); 

        this.state = {
            mdata: []
        }
    }

     componentWillMount() {
        axios.get('http://localhost:5000/shop/products')
            .then(res => {
                this.setState({mdata: res.data}); 
                console.log(this.state); 
            })
            .catch(err => console.log(err)); 
    }

    
    render() {
        return (
            <div> 
                <Header/>
                <div className="homepage">
                    {this.state.mdata.map((data, index) => ( 
                        <Product 
                            title = {data['itemName']}
                            description = {data.description}
                            price = {data.cost}
                            reviews = {data.totalRatings}
                            rating = {data.avgRatings}
                            image = {data['imageLink']}
                            category = {data.category}
                            id = {data._id}
                        />
        
                    ))}
                </div>
            </div>
        )
    }
            
}
  