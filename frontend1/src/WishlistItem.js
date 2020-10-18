import React from "react"
import "./WishlistItem.css"
import axios from "axios"; 

// components: Name, Price, Image, Catergory, UniqueProductID?

function WishlistItem({title, price, image, category, id, description}) {
    function moveToCart(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/users/wishlist/delete/' + id)
            .then(() => 
                axios.post('http://localhost:5000/users/cart/add/' + id)  
                    .then(res => {
                        alert(JSON.stringify(res.data)); 
                        window.location.reload(); 
                    })
                    .catch(err => alert(JSON.stringify(err)))
            )
    }

    function deleteFromWishlist(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/users/wishlist/delete/' + id)  
            .then(res => {
                alert(JSON.stringify(res.data));  
                window.location.reload(); 
            })
            .catch(err => alert(JSON.stringify(err))); 
    }

    return (
        <tr className="wishlist_item">
            
            <img src={image} className="witem_image"/>

            <td className="witem_id">
                View: <a href={"/products/" + id}>{id}</a>
            </td>

            <td className="witem_title">
                {title}
            </td>

            <td className="witem_category">
                {category} 
            </td>

            <td className="witem_price">
                <small>₹</small>
                <strong className="witem_price_tag">{price}</strong>
            </td>

            <td><button onClick={moveToCart}>Move to Cart</button>
            <button onClick={deleteFromWishlist}>Delete from Wishlist</button></td> 

        </tr>
    )
}

export default WishlistItem  