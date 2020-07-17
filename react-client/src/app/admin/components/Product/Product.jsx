import React from 'react';
import {NavLink} from "react-router-dom";
import * as Routes from '../../../routes'
import {useApi} from "../../../services";

const Product = ({index, product}) => {

		const { removeProduct, removeProductFromAllOrdersAndCarts } = useApi();

		const handleRemove = async (ev) => {
				ev.preventDefault();

				// TODO: delete product from all carts that have it
				const { id } = ev.target.dataset;
				await removeProduct(id);
		}

		return (
				<tr className="text-white" key={index}>
						<td>{index}</td>
						<td>{product.title}</td>
						<td>{product.description}</td>
						<td>{product.price}</td>
						<td>
								<NavLink className="btn btn-warning" to={`${Routes.BACKOFFICE_PRODUCT}${product._id}`}>Edit</NavLink>
						</td>
						<td>
								<button
										className="btn btn-warning"
										data-id={product._id}
										onClick={handleRemove}>
										Remove
								</button>
						</td>
				</tr>
		)
}

export default Product;