import React from "react"
import "./Product.css"

// components: Name, Price, Rating, Image, Catergory, Number of Reviews, UniqueProductID?

function Product({title, price, rating, image, category, reviews, id, description}) {
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
                {id}
            </p>

            <button>Add to Cart</button>
            <button>Wishlist Item</button> 

        </div>
    )
}

export default Product  