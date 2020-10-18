import React from 'react'
import "./Header.css";
import {Link} from "react-router-dom";

function Header() {
    if (sessionStorage.getItem("username")) {
        return (
            <nav className = "header">
                
                {/* Logo */}
                <Link to = "/">
    
                    <img className = "header__logo" src = "http://pngimg.com/uploads/wordpress/wordpress_PNG43.png" alt = "" />
    
                </Link>
    
                {/* Search bar */}
    
                <input className = "header__searchbar" type = "text" />
    
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
    
                    <img className = "header__logo" src = "http://pngimg.com/uploads/wordpress/wordpress_PNG43.png" alt = "" />
    
                </Link>
    
                {/* Search bar */}
    
                <input className = "header__searchbar" type = "text" />
    
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

export default Header
