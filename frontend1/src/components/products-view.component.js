import React, { Component } from 'react'; 
import axios from 'axios';
import Header from "../Header";
import Product, {addToCart} from '../Product.js';
import '../Product.css';
import '../App.css'; 
import { useParams } from 'react-router-dom';

export default class ProductsView extends Component{
        
    constructor(props) {
        super(props); 

        this.state = {
            mdata: [],
        }
    }


     componentWillMount() { 
        axios.get('http://localhost:5000/shop/products/' + this.props.match.params.id)  
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
                    
                        <Product 
                            title = {this.state.mdata['itemName']}
                            description = {this.state.mdata.description}
                            price = {this.state.mdata.cost}
                            reviews = {this.state.mdata.totalRatings}
                            rating = {this.state.mdata.avgRatings}
                            image = {this.state.mdata['imageLink']}
                            category = {this.state.mdata.category}
                            id = {this.state.mdata._id}
                        />
        
                    </div>
            </div>
        )
    }
            
}
  