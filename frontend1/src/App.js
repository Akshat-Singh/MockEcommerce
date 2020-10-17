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
import Product from "./Product.js";

import ProductsHome from "./components/products-home.component"; 


const responseGoogle = response => {
  console.log(response);
};

function App() {
return (
    <Router>
      <div className="App">
        {/* Making different links after / */}  
        <Switch>
          <Route path = "/checkout">

            <h1>
              Checkout Page
            </h1>
            
          </Route> 

          <Route path="/users/login" component={UserLogin}/>
          <Route path="/users/register" component={UserRegister}/>
          <Route path="/users/profile" component={UserProfile}/>
          <Route path="/users/wishlist" component={UserWishlist}/>
          <Route path="/users/cart" component={UserCart}/>

          <Route path = "/products" component={ProductsHome}/>         
          
          {/* ----------------------------------------------- */}

          {/* Default path */}
          <Route path = "/">


            <Header />
              <h1>
                Home page
              </h1>

            <div className="homepage">

              <Product
                  title="Intel Core i5 9400"
                  price="11744"
                  rating="4.5"
                  image="https://images-na.ssl-images-amazon.com/images/I/71CgBgacAsL._SL1500_.jpg"
                  category="Processors"
                  reviews="10"
                  id="03298402934"
                />

                <Product
                  title="NVDIA GeForce RTX 3080"
                  price="15800"
                  rating="4"
                  image="https://cdn.mos.cms.futurecdn.net/VBZLex9iAeLFxbZqLFRVPY.jpg"
                  category="GPUs"
                  reviews="20"
                  id="03298402234"
                />

                <Product
                  title="NVDIA GeForce RTX 3080"
                  price="15800"
                  rating="4"
                  image="https://cdn.mos.cms.futurecdn.net/VBZLex9iAeLFxbZqLFRVPY.jpg"
                  category="GPUs"
                  reviews="20"
                  id="03298402234"
                />

                <Product
                  title="NVDIA GeForce RTX 3080"
                  price="15800"
                  rating="4"
                  image="https://cdn.mos.cms.futurecdn.net/VBZLex9iAeLFxbZqLFRVPY.jpg"
                  category="GPUs"
                  reviews="20"
                  id="03298402234"
                />

                <Product
                  title="NVDIA GeForce RTX 3080"
                  price="15800"
                  rating="4"
                  image="https://cdn.mos.cms.futurecdn.net/VBZLex9iAeLFxbZqLFRVPY.jpg"
                  category="GPUs"
                  reviews="20"
                  id="03298402234"
                />

                <Product
                  title="NVDIA GeForce RTX 3080"
                  price="15800"
                  rating="4"
                  image="https://cdn.mos.cms.futurecdn.net/VBZLex9iAeLFxbZqLFRVPY.jpg"
                  category="GPUs"
                  reviews="20"
                  id="03298402234"
                />

                <Product
                  title="NVDIA GeForce RTX 3080"
                  price="15800"
                  rating="4"
                  image="https://cdn.mos.cms.futurecdn.net/VBZLex9iAeLFxbZqLFRVPY.jpg"
                  category="GPUs"
                  reviews="20"
                  id="03298402234"
                />

              </div>
            

          </Route>

          
          {/* ----------------------------------------------- */}

        </Switch>
     
      </div>
    </Router>

  );
}

export default App;