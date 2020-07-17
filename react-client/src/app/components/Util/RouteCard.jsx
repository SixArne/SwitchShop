import React from 'react';

const RouteCard = (to, {children}) => {
		return(
				<a href={to}>
						{children}
				</a>
		)
}

export default RouteCard;
