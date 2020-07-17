import React, { Fragment, useEffect } from 'react';

import { useApi } from "../../../services";
import Product from "./Product";



const ProductList = () => {
		const { findAllProducts, products } = useApi();

		useEffect(() => {
				const getProducts = async () => {
						const data = await findAllProducts();
				}

				getProducts();
		}, [])

		return (
				<div className="product-list my-3">
						<table className="table table-striped table-dark">
								<thead>
								<tr className="text-white">
										<th scope="col"></th>
										<th scope="col">Title</th>
										<th scope="col">Description</th>
										<th scope="col">Price</th>
										<th scope="col">Edit</th>
										<th scope="col">Delete</th>
								</tr>
								</thead>
								<tbody>
								{
										(products)? (
												products.map((product, index) => {
														return (
																<Product key={index}
																	index={index +1}
																	product={product}
																/>
														)
												})
										): <Fragment/>
								}
								</tbody>
						</table>
				</div>
		)
}

export default ProductList;