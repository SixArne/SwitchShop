import React, {Fragment, useEffect, useState} from 'react';
import {useApi} from "../../services";
import { useParams } from "react-router-dom";
import OrderCard from "../components/Card/OrderCard";

const OrderPage = () => {
		const { id } = useParams();
		const { findOrderById } = useApi();

		const [order, setOrder] = useState();

		useEffect(() => {
				const getOrder = async () => {
						const data = await findOrderById(id);
						setOrder(data);
				}

				getOrder();
		}, [])

		return (
				<div className="container-fluid">
						<div className="row">
								<div className="col-md-12">
										{
												(order) ? (
														<OrderCard
															order={order}
														/>
												) : <Fragment/>
										}
								</div>
						</div>
				</div>
		)
};

export default OrderPage;