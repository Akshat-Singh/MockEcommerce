import React, { Component } from 'react'; 
import axios from 'axios';
import Header from "../Header";
import Product from '../Product.js';
// import '../Product.css';
// import '../App.css'; 
import '../components/product-view.component.css'

export default class ProductsView extends Component{
        
    constructor(props) {
        super(props); 

        this.state = {
            mdata: [],
            rating: '', 
            ratingsArray: []
        }

        this.onChangeRating = this.onChangeRating.bind(this); 
        this.submitRating = this.submitRating.bind(this); 
    }

    onChangeRating(e) {
        this.setState({rating: e.target.value});
    }

    submitRating(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/shop/products/' + this.props.match.params.id + '/rating', {"yourRating": this.state.rating})
            .then(res => {
                alert(res)
            })
            .catch(err => alert(err)); 
    }

     componentWillMount() { 
        axios.get('http://localhost:5000/shop/products/' + this.props.match.params.id)  
            .then(res => {
                this.setState({mdata: res.data, ratingsArray: res.data.ratings}); 
                console.log(this.state); 
            })
            .catch(err => console.log(err)); 
    } 

    
    render() {
        return (
            <div> 

                <Header />
                <div className="productViewWrapper">

                    <div className="productActual">
                        <div>
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
                      

                    <div className="ratings"/*style={{color: "blue"}}*/>
                        <h1>Here's how others rated this product:</h1> 
                        <table>
                            {this.state.ratingsArray.map((data, index) => (
                                <tr>
                                    <td>{data.email}:&nbsp;  &nbsp;</td>
                                    <td className="ratingNum">&nbsp;&nbsp;{data.rating}/5</td>
                                </tr> 
                            ))}
                        </table>
                    </div>            
                    

                    <div className = "review">
                        <div className = "review__container">
                            <h3> Average Rating: {this.state.mdata['avgRatings']}/5 </h3>
                            
                            <h3> Total Reviews: {this.state.mdata['totalRatings']}  </h3>
                        

                        
                            <p>Your rating:</p>
                            <form onSubmit={this.submitRating}>
                                <select className = "__submit" onChange={this.onChangeRating}>
                                    <option value="0" selected={true} disabled={true}>0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <button className = "login__submit" type="submit">Submit Rating</button>
                            </form> 

                        </div>
                    </div>      
                </div>
            </div>
        )
    }
            
}
  