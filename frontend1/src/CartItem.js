import React from "react"
import "./WishlistItem.css"
import axios from "axios"; 

// components: Name, Price, Image, Catergory, UniqueProductID?


function WishlistItem({title, price, image, category, id, description}) {
    function addToCart(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/users/cart/add/' + id)  
            .then(res => {
                console.log(res);  
            })
            .catch(err => console.log(err)); 
    }

    function Wishlist(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/users/wishlist/add/' + id)  
            .then(res => {
                console.log(res);  
            })
            .catch(err => console.log(err)); 
    }

    return (
        <tr className="cart_item">
            
            <img src={image} className="citem_image"/>

            <td className="citem_id">
                View: <a href={"/products/" + id}>{id}</a>
            </td>

            <td className="citem_title">
                {title}
            </td>

            <td className="citem_category">
                {category} 
            </td>

            <td className="citem_price">
                <small>₹</small>
                <strong className="citem_price_tag">{price}</strong>
            </td>

            <td><button onClick={addToCart}>Add to Cart</button>
            <button onClick={Wishlist}>Wishlist Item</button></td> 

        </tr>
    )
}

export default WishlistItem  