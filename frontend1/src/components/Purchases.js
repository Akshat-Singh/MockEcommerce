import React from "react"
import "../WishlistItem.css"

// components: Name, Price, Image, Catergory, UniqueProductID?

function Purchase({title, price, image, category, id, description}) {

    return (
        <tr className="cart_item">
            
            <img src={image} alt="Product" className="citem_image"/>

            <td className="citem_id">
                <h5 >View: <a href={"/products/" + id}>{id}</a> </h5>
            </td>

            <td className="citem_title">
                <h5> {title} </h5>
            </td>

            <td className="citem_category">
               <h5> {category} </h5>
            </td>

            <td className="pitem_price">
                <h6> <small>₹</small>
                <strong>{price}</strong> </h6>
            </td>
        </tr>
    )
}

export default Purchase  