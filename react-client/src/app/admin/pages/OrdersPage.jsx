import React, {Fragment, useEffect, useState} from 'react';
import { useApi } from "../../services";
import Card from "../components/Card/Card";
import ListCard from "../components/Card/ListCard";

const OrdersPage = () => {
		const { findAllCustomerOrders, orders } = useApi();

		useEffect( () => {
				const getOrders = async () => {
						await findAllCustomerOrders();
				}

				getOrders();
		}, [])

		const calculateUnfinishedOrders = () => {
				const unfinished = orders.filter((order) => order.completedAt == null);
				return unfinished.length;
		}

		const calculateFinishedOrders = () => {
				const unfinished = orders.filter((order) => order.completedAt !== null);
				return unfinished.length;
		}

		return (
				<div className="container-fluid mt-5">
						<div className="row">
								<div className="col-md-4">
										{
												(orders)? (
																<Card
																		title="total orders"
																		icon="fas fa-shopping-basket"
																		body={orders.length}
																/>
														)
														: <Fragment/>
										}
								</div>
								<div className="col-md-4">
										{
												(orders)? (
																<Card
																		title="finished orders"
																		icon="fas fa-shopping-basket"
																		body={calculateFinishedOrders()}
																/>
														)
												: <Fragment/>
										}
								</div>
								<div className="col-md-4">
										{
												(orders)? (
																<Card
																		title="unfinished orders"
																		icon="fas fa-shopping-basket"
																		body={calculateUnfinishedOrders()}
																/>
														)
														: <Fragment/>
										}
								</div>
						</div>
						<div className="row">
								<div className="col-md-12">
										{
												(orders)? (
														<ListCard
																title="Uncompleted orders"
																icon="fas fa-shopping-basket"
														/>
												): <Fragment/>
										}
								</div>
						</div>
				</div>
		)
};

export default OrdersPage;