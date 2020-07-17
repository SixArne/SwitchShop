import React, {Fragment, useEffect, useState} from 'react';
import {useApi} from "../../../services";
import {NavLink} from "react-router-dom";

import { BACKOFFICE_ORDER } from '../../../routes';
import './Card.scss';

const ListCard = ({title, icon }) => {
		const { completeOrder, removeOrder, orders } = useApi();

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
				<div className="card my-3 bg-dark text-white">
						<div className="card-header d-flex align-items-center justify-content-between">
								<i className={icon}></i>
								<h5 className="m-0">{title}</h5>
						</div>
						<div className="card-body">
								<table className="table table-striped table-dark ">
										<thead>
												<tr className="text-white">
														<th scope="col"></th>
														<th scope="col">Email</th>
														<th scope="col">item count</th>
														<th scope="col">more info</th>
														<th scope="col">mark completed</th>
														<th scope="col">remove</th>
												</tr>
										</thead>
										<tbody>
												{
														(orders) ? (
																orders.map((order, index) => {
																		if (!order.completedAt && order.userID) {
																				return (
																						<tr className="text-white" key={index}>
																								<th scope="row">{index + 1}</th>
																								<td>{order.userID.email}</td>
																								<td>{order.list.length}</td>
																								<td><NavLink className="btn btn-info" to={`${BACKOFFICE_ORDER}${order._id}`}>Info</NavLink></td>
																								<td><button onClick={handleComplete} data-id={order._id} className="btn btn-success">Complete</button></td>
																								<td><button onClick={handleRemove} data-id={order._id} className="btn btn-danger">Remove</button></td>
																						</tr>
																				)
																		} else {
																				return <Fragment/>
																		}
																})
																) : <Fragment/>

												}
										</tbody>
								</table>
						</div>
				</div>
		)
}

export default ListCard;