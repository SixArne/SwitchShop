import React from 'react';
import ProductCategories from "./ProductCategories";

import {useApi} from "../../services";
import RouteCard from "../Util/RouteCard";

const ProductCard = ({product}) => {
    const { addToCart } = useApi();

    const handleAddEvent = (ev) => {
        ev.preventDefault();

        try {
            addToCart(product._id);
        } catch (err) {
            console.log("failed to add product to car", err);
        }
    }

    return (
        <div className="product-card">
            <div className="product-container">
                <div className="product-card-main">
                    <img src={product.images[0]} alt="" className="product-card-image"/>
                    <h1 className="product-card-title">{product.title}</h1>
                    <ProductCategories/>
                </div>
                <div className="product-card-footer">
                    <h3 className="product-card-price">{product.price}$</h3>
                    <button className="product-card-add" onClick={handleAddEvent}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;