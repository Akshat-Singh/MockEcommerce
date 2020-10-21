import React from 'react';
import {Link} from "react-router-dom";
import "./cover.css";
import "./boot.min.css";
import Button from 'react-bootstrap/Button';

function Homepage() {
    return (

    <div className = "htmlbody text-center">

      
    <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">

      {/*============== Header of Home Page ==============*/}
      
      <header className="masthead mb-auto">
        <div className="inner">
          <h3 className="masthead-brand">Computer Parts Store</h3>
          <nav className="nav nav-masthead justify-content-center">
            <Link className="nav-link active" to ="/">Home</Link>
            <Link className="nav-link" to ="/withNavbar">Navigation Bar</Link>
            {/* <Link className="nav-link" to ="#">Contact</Link> */}
          </nav>
        </div>
      </header>

      {/* ============== Main Body of the Home Page ============== */}

      <main role="main" className="inner cover">
        <h1 className="cover-heading"> One-stop shop for your PC needs.</h1>
        <p className="lead">CPUs, GPUs, Monitors, and more.</p>
        <p className="lead">
            <Link to = "/products">
                <Button variant="light">Products </Button> &nbsp;
            </Link>
            
            <Link to = "/users/login">
                <Button variant="light"> Sign in </Button> &nbsp;
            </Link>
            
            <Link to = "/users/register">
                <Button variant="light"> Register </Button> &nbsp;
            </Link>
            <Link to = "/users/wishlist">
                <Button variant="light"> Wish list </Button> &nbsp;
            </Link>
            <Link to = "users/cart">
                <Button variant="light"> Cart </Button> 
            </Link> &nbsp;
            <Link to = "users/profile/purchases">
                <Button variant="light"> My Purchases </Button> 
            </Link>
            

        </p>
      </main>

      {/* ============== Footer of the Home Page ============== */}

      <footer className="mastfoot mt-auto">
        <div className="inner">
          <p>Created by <Link to ="https://github.com/Akshat-Singh"> Akshat</Link>, <Link to  = "https://github.com/nikhilbhave9"> 
        Nikhil</Link>, and <Link to  = "https://github.com/vibodhnautiyal"> Vibodh </Link> </p>
        </div>
      </footer>
    </div>

    </div>

    )

}

export default Homepage