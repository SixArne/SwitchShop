import React from 'react';

const Card = ({title, icon, body}) => {
	return(
			<div className="card my-3 text-white bg-dark">
					<div className="card-header d-flex align-items-center justify-content-between">
							<i className={icon}></i>
							<h5 className="m-0">{title}</h5>
					</div>
					<div className="card-body">{body}</div>
			</div>
	)
}

export default Card;