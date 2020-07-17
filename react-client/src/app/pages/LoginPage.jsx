import React, {useEffect, useState} from 'react';
import Luigi from '../_static/images/luigi.svg';
import { DesktopLoginForm } from '../components/Form';
import {SideImage} from '../components/SideImage';
import {useResize} from '../services';
import MobileLoginForm from '../components/Form/MobileLoginForm';


const RegisterPage = () => {
		const {} = useResize();

		const { resizeWidth, resizeHeight } = useResize();

		return(
				(resizeWidth < 500 && resizeHeight < 800)? (
						<div className='container-fluid bg-white'>
								<div className="row">
										<div className="col-md-12">
												<MobileLoginForm/>
										</div>
								</div>
						</div>
				) : <div className='container-fluid bg-white'>
						<div className="row">
								<div className="col-md-6">
										<SideImage
												image={Luigi}
												alt="Luigi jumping"
										/>
								</div>
								<div className="col-md-6">
										<DesktopLoginForm/>
								</div>
						</div>
				</div>
		);

}

export default RegisterPage;
