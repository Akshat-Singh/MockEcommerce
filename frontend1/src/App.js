import React from 'react';
import axios from 'axios'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Header from "./Header";
import UserLogin from "./components/user-signin.component";
import UserRegister from "./components/user-register.component";

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

          <Route path= "/users/login" component={UserLogin}/>
          <Route path="/users/register" component={UserRegister}/>
    
          {/* Default path */}
          <Route path = "/">

            <Header />
            <h1>
              Home page
            </h1>

          </Route>

        </Switch>
     
      </div>
    </Router>

  );
}

export default App;
