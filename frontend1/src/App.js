import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Header from "./Header";
import {GoogleLogin} from "react-google-login";

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

          <Route path = "/login">
            <h1>
              Login page
            </h1>

            <form>
              <input type="text" id="email" placeholder="Email"></input> 
              <input type="password" id="password" placeholder="Password"></input> 
              <button id="submit" type="submit">Submit</button>
            </form>
            <GoogleLogin
            clientId = "741110853489-3h88ghsg0u7qmjsjs6856g132dt9l5nk.apps.googleusercontent.com"
            onSuccess = {responseGoogle}
            onFailure = {responseGoogle}
            />
          </Route>
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
