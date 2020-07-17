import React from 'react';
import Luigi from '../../_static/images/luigi.svg';

import './SideImage.scss';

const SideImage = ({image, alt}) => {
		return (
				<div className="login-left-pannel">
						<img src={image} alt={alt}/>
				</div>
		)
}

export default SideImage;