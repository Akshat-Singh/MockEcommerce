import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 

export default class Navbar extends Component {

    render() {
        return (
            <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
                <link to="/" className="navbar-brand">ShopLyft</link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <link to="/" className="nav-link">Home</link>
                        </li> 

                        <li className="navbar-item">
                            <link to="/add" className="nav-link">New Account</link> 
                        </li>

                        <li className="navbar-item">
                            <link to="/shop" className="nav-link">Shop</link>
                        </li>
                    </ul> 
                </div>
            </nav>
        );
    }
}