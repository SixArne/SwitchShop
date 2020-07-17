import React from 'react';

const ProductSpecs = ({product}) => {
		return (
				<div className="product-specifications">
						<div className="product-specifications-column">
								<h6 className="product-brand">{product.specifications.brand}</h6>
								<h6 className="product-warranty">{product.specifications.warranty}</h6>
								<h6 className="product-developer">{product.specifications.developer}</h6>
								<h6 className="product-publisher">{product.specifications.publisher}</h6>
						</div>
						<div className="product-specifications-column">
								<h6 className="product-menu-language">{product.specifications.menuLanguage}</h6>
								<h6 className="product-spoken-language">{product.specifications.spokenLanguage}</h6>
								<h6 className="product-pegi-age">{product.specifications.PEGIage}</h6>
								<h6 className="product-pegi-content">{product.specifications.PEGIcontent}</h6>
						</div>
				</div>
		)
}

export default ProductSpecs;