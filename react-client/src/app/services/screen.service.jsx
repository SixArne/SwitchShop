/* @author Philippe De Pauw */

import React, { createContext, useContext, useEffect, useState } from 'react';

const ResizeContext = createContext();
const useResize = () => useContext(ResizeContext);

const ResizeProvider = ({children}) => {
		const [ resizeHeight, setResizeHeight ] = useState(window.innerHeight
				|| document.documentElement.clientHeight
				|| document.body.clientHeight);
		const [ resizeWidth, setResizeWidth ] = useState(window.innerWidth
				|| document.documentElement.clientWidth
				|| document.body.clientWidth);

		useEffect(() => {
				window.addEventListener('resize', () => {
						const h = window.innerHeight
								|| document.documentElement.clientHeight
								|| document.body.clientHeight;
						const w = window.innerWidth
								|| document.documentElement.clientWidth
								|| document.body.clientWidth;

						setResizeHeight(h);
						setResizeWidth(w);
				});

				return () => window.removeEventListener('resize', useEffect);
		}, [])

		return (
				<ResizeContext.Provider value={{resizeWidth, resizeHeight}}>
						{children}
				</ResizeContext.Provider>
		);
};

export {
		ResizeContext,
		ResizeProvider,
		useResize,
};