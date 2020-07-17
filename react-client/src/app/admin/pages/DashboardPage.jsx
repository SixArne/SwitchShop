import React, {useEffect} from 'react';
import {Card} from "../components/Card";
import {useApi} from "../../services";

const DashboardPage = () => {
		const {
				findAllCustomerOrders,
				findAllProducts,
				findAllCustomerWishlists,
				findAllCustomers,
				users,
				orders,
				products,
				wishlists,
		} = useApi();

		useEffect( () => {
				const getOrders = async () => {
						await findAllCustomerOrders();
				}

				getOrders();
		}, [])

		useEffect(() => {
				const getProducts = async () => {
						await findAllProducts();
				}

				getProducts();
		}, [])

		useEffect(() => {
				const getUsers = async () => {
						await findAllCustomers();
				}

				getUsers()
		}, [])

		return (
				<div className="container-fluid mt-5">
						<div className="row">
								<div className="col-md-4">
										<Card
												title="Orders"
												icon="fas fa-shopping-basket"
												body={(orders)? orders.length: 0}
										/>
								</div>
								<div className="col-md-4">
										<Card
												title="Users"
												icon="fas fa-users"
												body={(users)? users.length: 0}
										/>
								</div>
								<div className="col-md-4">
										<Card
												title="Products"
												icon="fas fa-dice-d6"
												body={(products)? products.length: 0}
										/>
								</div>
						</div>
						<div className="row">
								<div className="col-md-6">

								</div>
								<div className="col-md-6">

								</div>
						</div>
				</div>
		)
};

export default DashboardPage;