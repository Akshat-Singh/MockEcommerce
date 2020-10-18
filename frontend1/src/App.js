import React from 'react';
import axios from 'axios'


import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Header from "./Header";
import UserLogin from "./components/user-signin.component";
import UserRegister from "./components/user-register.component";
import UserProfile from "./components/user-profile.component";
import UserWishlist from "./components/user-wishlist.component";
import UserCart from "./components/user-cart.component";
import UserSignout from "./components/user-signout.component"


import ProductsHome from "./components/products-home.component"; 
import ProductsView from "./components/products-view.component";

axios.defaults.withCredentials = true; 

function App() {
return (
    <Router>
      <div className="App">
        {/* Making different links after / */}  
        <Switch>
          <Route path = "/checkout">

            <h1>
              Checkout Pagey
            </h1>
            
          </Route> 

          <Route path="/users/login" component={UserLogin}/>
          <Route path="/users/register" component={UserRegister}/>
          <Route path="/users/profile" component={UserProfile}/>
          <Route path="/users/wishlist" component={UserWishlist}/>
          <Route path="/users/cart" component={UserCart}/>
          <Route path="/users/signout" component={UserSignout}/>
          <Route path="/products/:id" component={ProductsView}/> 
          <Route path = "/products" component={ProductsHome}/>    
          
          
          {/* ----------------------------------------------- */}

          {/* Default path */}
          <Route path = "/">


            <Header />
              <h1>
                Home page
                
              </h1>
            

          </Route>

          
          {/* ----------------------------------------------- */}

        </Switch>
     
      </div>
    </Router>

  );
}

export default App;