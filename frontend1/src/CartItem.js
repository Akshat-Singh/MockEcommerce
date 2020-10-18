import React from "react"
import "./WishlistItem.css"
import axios from "axios"; 

// components: Name, Price, Image, Catergory, UniqueProductID?


function CartItem({title, price, image, category, id, description}) {
    function moveToWishlist(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/users/cart/delete/' + id)
            axios.post('http://localhost:5000/users/wishlist/add/' + id)  
                .then(res => {
                    alert(JSON.stringify(res.data));  
                    window.location.reload();
                })
                .catch(err => alert(JSON.stringify(err))); 
    }

    function deleteFromCart(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/users/cart/delete/' + id)  
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

            <td><button onClick={moveToWishlist}>Move to Wishlist</button>
            <button onClick={deleteFromCart}>Delete from Cart</button></td> 

        </tr>
    )
}

export default CartItem  