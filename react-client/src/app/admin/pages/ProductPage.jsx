import React, { Fragment, useEffect } from 'react';
import { useApi } from '../../services';
import { ProductList, ProductForm } from '../components/Product/';

const ProductPage = () => {
		return (
				<div className="container-fluid">
						<div className="row">
								<div className="col-md-6">
										<ProductList/>
								</div>
								<div className="col-md-6">
										<ProductForm/>
								</div>
						</div>
				</div>
		)
};

export default ProductPage;