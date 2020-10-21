<h1 align="center">E-Commerce Web Platform</h1>


> Project titled "Computer Parts Store" <br />
> Created using the MERN stack (MongoDB, Express.js, React.js, Node.js) <br />
> Created as a part of the coursework for CS-1202: Advanced Programming (Monsoon 2020) <br />

## Contents
- [Main Features](#--main-features)
- [Languages and Frameworks](#languages-and-frameworks)
- [Installation](#installation)
- [People](#people)
- [License](#license)


## Main Features 
- **Homepage:**
Homepage consists of anchor links to Products, Sign-in, Register, Wishlist, Cart. It also has a navigation bar consisting of a Home, Contact and Toggle Navbar componenent. 

- **Products:**
Products page consists of a list of all products. Each product has an individual product "card" which has details such as price, rating, reviews, etc as well as a "know more" link. If clicked, it redirects a page dedicated to that specific product, where a user can view reviews of other users as well as rate the product herself. Reviews are between 0 and 5. 
The product page can also has a "sort" feature. One can sort by price, name or rating, either in ascending or descending order. It can also display products of a particular category. 

- **Register and Sign-in:**
The register and sign-in features are based on SHA-256 encryption algorithm. Clicking on the register button navigates you to a page where you can enter your email and password, and then confirm your password. This stores your details in the database. 
The sign-in button redirects you to a similar page where you have to enter your registered email and password. After a successful login, you are redirected to the home page. The user's email also appears on the nav bar.
Finally, the logout option on the navigation bar logs you out. 

- **Shopping Cart and Wishlist:**
If the "Add to Cart" button on the product tile is clicked, it add that product to the shopping cart. The shopping cart can be accessed via the Navigation Bar. The cart itself is a tabular representation that displays the product image, title, category, price and the "know more" link for each product, along with two buttons that allow you to either delete from cart or move to the wishlist. Similarly, the wishlist has the option to move to cart and delete from wishlist. 





## Languages and Frameworks 
Main frameworks and languages used: 
#### Frontend
- React JS (Primary frontend framework)
- React-router (Routing to different sub-pages)
- Axios (HTTP Requests)
- HTML 
- CSS Bootstrap
- CSS Grid 

#### Backend 
- MongoDB (NoSQL database program)
- MongoDB Atlas
- Express 
- Mongoose  
- SHA-256

## Installation
- Make sure that node and react are installed on your machine, along with 'create-react-app', 'mongoose', 'bootstrap', and 'axios'
- Navigate to the backend folder on the terminal. Start the nodejs server by entering 'node app' 
- Navigate to the frontend folder on a different terminal. Start the react app by entering 'npm start'
- 'localhost:3000' should open up in your default browser. 

## People 
- Akshat Singh: 
https://github.com/Akshat-Singh
- Nikhil Bhave
https://github.com/nikhilbhave9
- Vibodh Nautiyal 
https://github.com/vibodhnautiyal

## License
This project is [MIT](https://opensource.org/licenses/MIT) licensed. 
