import React, {Fragment} from 'react';
import {useApi} from "../../services";
import * as Routes from "../../routes";
import {NavLink} from "react-router-dom";

const ProductDetail = ({product}) => {

		const { addToCart } = useApi();

		const handleAddEvent = (ev) => {
				ev.preventDefault();

				console.log("got here");

				try {
						addToCart(product._id);
				} catch (err){
						console.log("failed to add product to cart", err)
				}
		}

		return (
				<div className="product-detail">
						<div className="product-detail-date">
								<p>{product.releaseDate}</p>
						</div>
						<div className="detail-container">
								<div className="product-images">
										<div className="product-images-upper">
												<img src={product.images[0]} alt=""/>
										</div>
										<div className="product-images-lower">
												{product.images.map((p, index) => {
														return (
																<img src={p} key={index} alt=""/>
														)
												})}
										</div>
								</div>
								<div className="product-information">
										<h3 className="product-title">{product.title}</h3>
										<h4 className="product-price">{product.price}$</h4>
										<p className="product-description">{product.description}</p>

										<div className="product-actions">
												<button className="product-add-cart" onClick={handleAddEvent}>Add to Cart</button>
												<NavLink className="product-buy-now" onClick={handleAddEvent} to={Routes.LANDING}>BUY NOW</NavLink>
										</div>
								</div>
						</div>
				</div>
		)
}

export default ProductDetail;