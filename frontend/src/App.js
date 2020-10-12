/* Essential imports to make React as smooth flowing as possible */
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"; 


/* Bootstrap CSS Framework */
import 'bootstrap/dist/css/bootstrap.min.css';


/* Import the components for routes */ 
import Navbar from "./components/navbar.components"; 


function App() {
	return (
		<Router>
			<Navbar />
		</Router>
	);
}

export default App;
