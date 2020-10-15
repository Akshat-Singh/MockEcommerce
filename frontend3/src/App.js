import React from 'react';
import Product from './Product.js'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

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

          <Route path = "/login">
            <h1>
              Login page
            </h1>
          </Route>
          {/* Default path */}
          <Route path = "/">

            <h1>
              Home page
            </h1>
            
            <Product
              name="Intel Core i5 9400"
              price="11744"
              rating="4.5"
              image="https://images-na.ssl-images-amazon.com/images/I/71CgBgacAsL._SL1500_.jpg"
              category="Processors"
              reviews="10"
              id="03298402934"
            />

          </Route>

        </Switch>
     
      </div>
    </Router>

  );
}

export default App;
