import React from "react"
import "./Product.css"
import axios from "axios"; 
import Header from "./Header"; 

// components: Name, Price, Rating, Image, Catergory, Number of Reviews, UniqueProductID?


function Product({title, price, rating, image, category, reviews, id, description}) {
    function addToCart(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/users/cart/add/' + id)  
            .then(res => {
                alert(JSON.stringify(res.data));  
                axios.get('http://localhost:5000/users/cart')
                .then(res => { 
                    sessionStorage.setItem("cartLength", res.data.length);
                });
                window.location.reload(); 
            })
            .catch(err => alert(JSON.stringify(err))); 
    }

    function Wishlist(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/users/wishlist/add/' + id)  
            .then(res => {
                alert(JSON.stringify(res.data));  
            })
            .catch(err => alert(JSON.stringify(err))); 
    }

    return (
        <div className="product">
            {/* Product Title */}
            <div className="firstline"> {/* Divided into different lines for ease of CSS styling */}
                <p className="product_title">
                    {title}
                </p>
            </div>

            {/* Product Price */}
            <div className="secondline"> 
                <p className="product_price">
                    <small>₹</small>
                    <strong className="product_price_tag">{price}</strong>
                </p>
                
            </div>

            {/* Product Image */}
            <img src={image} alt="Product" className="product_image"/>

            {/* Product Category */}
            <div className="thirdline">
            <p className="product_category">
                    Catergory: <strong>{category}</strong>
            </p>
            </div>

            {/* Product Rating */}
            <div className="fourthline">
            <p className="product_rating">
                    {/* Timestamp 2:15 */}
                    {rating}/5

            </p>
            </div>

            {/* Product Reviews */}
            <div className="fifthline">
            <p className="product_reviews">
                {reviews} customer(s) have reviewed this product
            </p>
            </div>

            {/* Product ID that redirects to specific product page */}
            <div className="sixthline">
            <p className="product_id">
                Click <a href={"/products/" + id}>here</a> to view
            </p>
            </div>

            {/* Buttons for adding to cart and wishlist */}
            <button onClick={addToCart}>Add to Cart</button>
            <button onClick={Wishlist}>Wishlist Item</button> 

        </div>
    )
}

export default Product  