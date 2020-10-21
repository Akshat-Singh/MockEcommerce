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

            <div className="firstline">
                <p className="product_title">
                    {title}
                </p>
            </div>

            <div className="secondline">
                <p className="product_price">
                    <small>₹</small>
                    <strong className="product_price_tag">{price}</strong>
                </p>


                
            </div>

            <img src={image} alt="Product" className="product_image"/>

            <div className="thirdline">
            <p className="product_category">
                    Catergory: <strong>{category}</strong>
            </p>
            </div>

            <div className="fourthline">
            <p className="product_rating">
                    {/* Timestamp 2:15 */}
                    {rating}/5

            </p>
            </div>

            <div className="fifthline">
            <p className="product_reviews">
                {reviews} customer(s) have reviewed this product
            </p>
            </div>

            <div className="sixthline">
            <p className="product_id">
                Click <a href={"/products/" + id}>here</a> to view
            </p>
            </div>

            <button onClick={addToCart}>Add to Cart</button>
            <button onClick={Wishlist}>Wishlist Item</button> 

        </div>
    )
}

export default Product  