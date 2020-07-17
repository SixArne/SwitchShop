import React, {Fragment} from 'react';
import {NavLink} from "react-router-dom";
import * as Routes from "../../../routes";
import {useApi} from "../../../services";

const OrderCard = ({order}) => {
		const {completeOrder, removeOrder} = useApi();

		// TODO: Delete product in all orders where product is null

		const calcTotalPrice = (ev) => {
			const result = order.list.reduce((acc, currProduct) => {
					if (currProduct.product) {
							const { price } = currProduct.product;
							const { quantity } = currProduct;

							const totalPrice = parseFloat(price) * quantity;
							return acc + totalPrice;
					}
			}, 0);
			return result;
		}

		const handleComplete = async (ev) => {
				ev.preventDefault();

				const { id } = ev.target.dataset;
				await completeOrder(id);
		}

		const handleRemove = async (ev) => {
				ev.preventDefault();

				const { id } = ev.target.dataset;
				await removeOrder(id);
		}

		return(
				<div className="card my-3 text-white bg-dark">
						<div className="card-header d-flex align-items-center justify-content-between">
								<h6>order: {order._id}</h6>
								<p>total: {calcTotalPrice()}</p>
						</div>
						<div className="card-body">
								{
										order.list.map((item, index) => {
												return (
														<div key={index} className="row d-flex align-items-center justify-content-between">
																<img className="col-2" src={item.product.images[0]} alt="product-image"/>
																<p className="col-3">{item.product.title}</p>
																<p className="col-3">{item.product.description}</p>
																<p className="col-2">{item.product.price}$</p>
																<p className="col-2">{item.quantity}</p>
														</div>
												)
										})
								}
										<table className="table table-striped table-dark table-responsive mt-5">
												<thead>
												<tr className="text-white">
														<th scope="col">firstname</th>
														<th scope="col">lastname</th>
														<th scope="col">place of residence</th>
														<th scope="col">postalcode</th>
														<th scope="col">streetname</th>
														<th scope="col">housenumber</th>
														<th scope="col">phonenumber</th>
														<th scope="col">email</th>
												</tr>
												</thead>
												<tbody>
													<tr>
															<th>{order.userID.profile.firstname}</th>
															<th>{order.userID.profile.lastname}</th>
															<th>{order.userID.profile.placeofresidence}</th>
															<th>{order.userID.profile.postalcode}</th>
															<th>{order.userID.profile.streetname}</th>
															<th>{order.userID.profile.housenumber}</th>
															<th>{order.userID.profile.phonenumber || 'not given'}</th>
															<th>{order.userID.email}</th>
													</tr>
												</tbody>
										</table>

								<div className="row">
										<div className="col-md-12">
												<NavLink to={Routes.BACKOFFICE_ORDERS} className="btn btn-success" data-id={order._id} onClick={handleComplete}>Completed</NavLink>
												<NavLink to={Routes.BACKOFFICE_ORDERS} className="btn btn-danger" data-id={order._id} onClick={handleRemove}>Remove</NavLink>
										</div>
								</div>
						</div>
				</div>
		)
}

export default OrderCard;