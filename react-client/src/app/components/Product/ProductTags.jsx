import React from 'react';

const ProductTags = ({product}) => {
		return (
				<div className="product-tags">
						{product.categories.map((cat) => {
								return (
										<h5 className="product-tag">{cat}</h5>
								)
						})}
				</div>
		)
}

export default ProductTags;