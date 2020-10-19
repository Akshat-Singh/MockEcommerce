import React from "react"

// components: Name, Price, Image, Catergory, UniqueProductID?

function Purchase({title, price, image, category, id, description}) {

    return (
        <tr className="purchased_item">
            
            <img src={image} alt="Product" className="pitem_image"/>

            <td className="pitem_id">
                View: <a href={"/products/" + id}>{id}</a>
            </td>

            <td className="pitem_title">
                {title}
            </td>

            <td className="pitem_category">
                {category} 
            </td>

            <td className="pitem_price">
                <small>₹</small>
                <strong className="pitem_price_tag">{price}</strong>
            </td>
        </tr>
    )
}

export default Purchase  