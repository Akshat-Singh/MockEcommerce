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
        <tr className="cart_item">
            
            <img src={image} className="citem_image"/>

            <td className="citem_id">
                <h5> View: <a href={"/products/" + id}>{id}</a> </h5>
            </td>

            <td className="citem_title">
                <h5> {title} </h5>
            </td>

            <td className="citem_category">
                <h5> {category} </h5>
            </td>

            <td className="citem_price">
                <h6><small>₹</small>
                <strong className="citem_price_tag">{price}</strong> </h6>
            </td>

            <td><button className = "btn btn-primary btn-sm" onClick={moveToCart}>Move to Cart</button>
            <button className = "btn btn-primary btn-sm" onClick={deleteFromWishlist}>Delete from Wishlist</button></td> 

        </tr>
    )
}

export default WishlistItem  