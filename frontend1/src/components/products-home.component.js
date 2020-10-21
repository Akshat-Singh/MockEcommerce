import React, { Component } from 'react'; 
import axios from 'axios';
import Header from "../Header";
import Product from '../Product.js';
import '../Product.css';
import '../App.css'; 
import './CustomFiltering.css'; 

export default class ProductsHome extends Component{

    constructor(props) {
        super(props); 

        this.state = {
            mdata: [], 
            filter: ""
        }

        this.sortAsc = this.sortAsc.bind(this);
        this.sortDsc = this.sortDsc.bind(this);
        this.sort = this.sort.bind(this); 
        this.filter = this.filter.bind(this); 
    }

    componentWillMount() {
        axios.get('http://localhost:5000/shop/products')
            .then(res => {
                this.setState({mdata: res.data}); 
                console.log(this.state); 
            })
            .catch(err => console.log(err)); 
    }

    sort(e) {
        e.preventDefault(); 

        let sortType = document.querySelector('input[type="radio"]:checked'); 
        if (sortType.value === 'A')
            this.sortAsc(e, sortType.id);
        else if (sortType.value === 'D')
            this.sortDsc(e, sortType.id); 
    }

    sortAsc(e, key) {        
        /* Function that sorts a JSON object array in ascending on the basis of the key */

        e.preventDefault();
        /* Referred to: https://stackoverflow.com/questions/8175093/simple-function-to-sort-an-array-of-objects */ 

        let tempData = this.state.mdata; 

        tempData = tempData.sort(function(e1, e2) {
            var element1 = e1[key];
            var element2 = e2[key];

            return ((element1 < element2) ? -1: ((element1 > element2) ? 1 : 0)); 
        });

        this.setState({mdata: tempData}); 
    }

    sortDsc(e, key) {
        /* Function that sorts a JSON object array in descending on the basis of the key */ 
        
        e.preventDefault();
        /* Referred to: https://stackoverflow.com/questions/8175093/simple-function-to-sort-an-array-of-objects */ 

        let tempData = this.state.mdata; 

        tempData = tempData.sort(function(e1, e2) {
            var element1 = e1[key];
            var element2 = e2[key];

            return ((element1 > element2) ? -1: ((element1 < element2) ? 1 : 0)); 
        });

        this.setState({mdata: tempData}); 
    }

    filter(e) {
        e.preventDefault(); 
        let value = document.getElementById("Filter").value; 
        this.setState({filter: value}); 
    }
    
    
    render() {
        return (
            <div> 
                <Header/>
                <div className="CustomFiltering" style={{"padding": "15px", "vertical-align": "middle", "width": "100%"}}>
                    Sort By
                    <form>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="D" id="cost"/> Prices: High to Low
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="A" id="cost"/> Prices: Low to High
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="A" id="itemName"/> Name: A to Z
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="D" id="itemName"/> Name: Z to A
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="D" id="avgRatings"/> Rating: High to Low
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="A" id="avgRatings"/> Rating: Low to High
                        </label>
                        <button onClick={this.sort}>Sort</button>

                        <select name="Filter" id="Filter" style={{"margin-left": "90px", "margin-right": "20px"}}>
                            <option value="" disbaled>Category</option> 
                            <option value="Processor">Processors</option>
                            <option value="Display">Display</option>
                            <option value="GPU">GPU</option>
                        </select>
                        <button onClick={this.filter}>Filter</button>
                    </form> 
                </div>

                <div className="homepage" style={{"margin-top": "50px"}}>
                    {this.state.mdata.map((data, index) => {
                        if (this.state.filter.length <= 0) {
                            return ( 
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
                            )
                        }

                        else if (this.state.filter === data.category){
                            return ( 
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
                            )
                        }
                    })}
                </div>
            </div>
        )
    }
            
}
  