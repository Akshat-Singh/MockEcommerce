import React from "react"
import "./Product.css"
import axios from "axios"; 

// components: Name, Price, Rating, Image, Catergory, Number of Reviews, UniqueProductID?


function Product({title, price, rating, image, category, reviews, id, description}) {
    function addToCart(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/users/cart/add/' + id)  
            .then(res => {
                alert(res);  
            })
            .catch(err => alert(err)); 
    }

    function Wishlist(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/users/wishlist/add/' + id)  
            .then(res => {
                alert(res);  
            })
            .catch(err => alert(err)); 
    }

    return (
        <div className="product">
            
            <p className="product_title">
                {title}
            </p>

            <p className="product_price">
                <small>₹</small>
                <strong className="product_price_tag">{price}</strong>
            </p>

            <p className="product_rating">
                {/* Timestamp 2:15 */}
                {rating}

            </p>

            <img src={image} alt="Product Image" className="product_image"/>

            <p className="product_category">
                {category} 
            </p>

            <p className="product_reviews">
                {reviews}
            </p>

            <p className="product_id">
                View: <a href={"/products/" + id}>{id}</a>
            </p>

            <button onClick={addToCart}>Add to Cart</button>
            <button onClick={Wishlist}>Wishlist Item</button> 

        </div>
    )
}

export default Product  