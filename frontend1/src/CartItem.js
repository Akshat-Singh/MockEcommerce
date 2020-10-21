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
                    axios.get('http://localhost:5000/users/cart')
                    .then(res => { 
                        sessionStorage.setItem("cartLength", res.data.length);
                    }); 
                    window.location.reload();
                })
                .catch(err => alert(JSON.stringify(err))); 
    }

    function deleteFromCart(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/users/cart/delete/' + id)  
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

    return (
        

        <tr className="cart_item">
            
            <img src={image} alt="Product" className="citem_image"/>

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
                <h6> <small>₹</small>
                <strong className="citem_price_tag">{price}</strong> </h6>
            </td>

            <td><button className = "btn btn-primary btn-sm" onClick={moveToWishlist}>Move to Wishlist</button> 
            <button className = "btn btn-primary btn-sm" onClick={deleteFromCart}>Delete from Cart</button></td> 

        </tr>


    )
}

export default CartItem  