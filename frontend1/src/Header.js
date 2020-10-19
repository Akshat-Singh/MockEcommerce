import React from 'react'
import "./Header.css";
import {Link} from "react-router-dom";
import axios from 'axios'; 


export default class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            main_suggestions: [],
            links: [], 
            suggestions: [],
            text: ''
        }
    }

    componentWillMount() {
        axios.get('http://localhost:5000/shop/products')
            .then(res => {
                let _suggestions = [];
                let _links = [];  
                for (var key in res.data) {
                    _suggestions.push(res.data[key]['itemName']); 
                    _links.push(res.data[key]['_id']); 
                }
                this.setState({main_suggestions: _suggestions, links: _links});  
            } 
        )
        .catch(err => console.log(err)); 
    }

    onTextChange = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.state.main_suggestions.sort().filter(v => regex.test(v))
        }

        this.setState(() => ({
            suggestions,
            text: value
        }))
    }

    selectedText(value) {
        this.setState(() => ({
            text: value,
        }))
    }

    renderSuggestions = () => {
        let { suggestions } = this.state;
        if(suggestions.length === 0){
            return null;
        }
        return (
            <ul >
                {
                    suggestions.map((item, index) => (<li key={index}><a href={"http://localhost:3000/products/" + this.state.links[index]}>{item}</a></li>))
                }
            </ul>
        );
    }   

    render() {
        const { text, suggestions } = this.state; 

        if (sessionStorage.getItem("username")) {
            return (
                <nav className = "header">
                    
                    {/* Logo */}
                    <Link to = "/">
        
                        <img className = "header__logo" src = "https://res.cloudinary.com/duzmuxrsw/image/upload/v1603088411/APLogo_tf5axm.png" alt = "" />
        
                    </Link>
        
                    {/* Search bar */}
                
                        <div width="450px" style={{color: "#90ABDC"}}> 
                            <input 
                                style={{width: "750px"}} 
                                placeholder="Search here for products or brands" 
                                autoComplete="off"
                                id="query" 
                                onChange={this.onTextChange}
                                value={text}/>
                                {this.renderSuggestions()}
                        </div>
                    
        
                    {/* Header link */}
        
                    <div className = "header__nav">
        
                        <Link to =  "/users/profile" className = "header__link">
        
                            <div className = "header__option">
                                <span className = "header__selection"> {sessionStorage.getItem("username")} </span>
                            </div>
                        </Link>
        
                        <Link to =  "/users/wishlist" className = "header__link">
        
                            <div className = "header__option">
                                <span className = "header__selection"> Wish List </span>
                            </div>
                        </Link>
        
                        <Link to =  "/users/cart" className = "header__link">
        
                            <div className = "header__option">
                                <span className = "header__selection"> Shopping Cart </span>
                            </div>
                        </Link>
                        
                        <Link to =  "/users/signout" className = "header__link">
        
                            <div className = "header__option">
                                <span className = "header__selection"> Logout </span>
                            </div>
                        </Link>
        
                    </div>
                    
                </nav>
            )
        }    
    
        else {
            return (

                <nav className = "header">
                    
                    {/* Logo */}
                    <Link to = "/">
        
                        <img className = "header__logo" src = "https://res.cloudinary.com/duzmuxrsw/image/upload/v1603088411/APLogo_tf5axm.png" alt = "" />
        
                    </Link>
        
                    {/* Search bar */}
        
                    <div class="" width="450px" style={{color: "#90ABDC"}}> 
                            <input 
                                style={{width: "1050px"}} 
                                placeholder="Search here for products or brands" 
                                autocomplete="off"
                                id="query" 
                                onChange={this.onTextChange}
                                value={text}/>
                                {this.renderSuggestions()}
                        </div>
                    
        
                    {/* Header link */}
        
                    <div className = "header__nav">
        
                        <Link to =  "/users/login" className = "header__link">
        
                            <div className = "header__option">
                                <span className = "header__selection"> Log in</span>
                            </div>
                        </Link>
                        
                        <Link to =  "/users/register" className = "header__link">
        
                            <div className = "header__option">
                                <span className = "header__selection"> Signup </span>
                            </div>
                        </Link>
        
                    </div>
                    
                </nav>
            )
        }   
    }
}
