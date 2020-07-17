import React, {Fragment, useEffect} from 'react';
import {useApi} from "../../services";

const UsersPage = () => {
		const { findAllCustomers, users, updateUserRole, deleteUser } = useApi();

		// TODO: Make page updates more optimized

		useEffect(() => {
				const getCustomers = async () => {
						await findAllCustomers();
				}

				getCustomers();
		}, [])

		const handleRoleChange = async (ev) => {
				ev.preventDefault();

				const {id, role} = ev.target.dataset;
				await updateUserRole(id, role);
		}

		const handleDelete = async (ev) => {
				ev.preventDefault();

				const {id} = ev.target.dataset;
				await deleteUser(id);
		}

		return (
				<div className="container-fluid mt-5">
						<div className="row">
								<div className="col-md-12">
										<table className="table table-striped table-dark ">
												<thead>
												<tr className="text-white">
														<th scope="col"></th>
														<th scope="col">Email</th>
														<th scope="col">role</th>
														<th scope="col">firstname</th>
														<th scope="col">lastname</th>
														<th scope="col">Make Admin</th>
														<th scope="col">remove</th>
												</tr>
												</thead>
												<tbody>
												{
														(users)? (
																users.map((user, index) => {
																		return (
																				<tr className="text-white" key={index}>
																						<th scope="row">{index + 1}</th>
																						<td>{user.email}</td>
																						<td>{user.role}</td>
																						<td>{user.profile.firstname}</td>
																						<td>{user.profile.lastname}</td>
																						{
																								(user.role === 'user') ? (
																										<td>
																												<button className="btn btn-warning" data-id={user._id} data-role="administrator" onClick={handleRoleChange}>Make Admin</button>
																										</td>
																								) : (
																										<td>
																												<button className="btn btn-info" data-id={user._id} data-role="user" onClick={handleRoleChange}>Make User</button>
																										</td>
																								)
																						}
																						{
																								(user.role === 'user') ? (
																										<td>
																												<button className="btn btn-danger" data-id={user._id} onClick={handleDelete}>Delete</button>
																										</td>
																								) : <td></td>
																						}
																				</tr>
																		)
																})
														) : <Fragment/>
												}
												</tbody>
										</table>
								</div>
						</div>
				</div>
		)
};

export default UsersPage;