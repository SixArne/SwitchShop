import {default as React, Fragment, useCallback, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../services';
import ProductDetail from "../components/Product/ProductDetail";
import ProductTags from "../components/Product/ProductTags";
import ProductSpecs from "../components/Product/ProductSpecs";

const ProductPage = ({children}) => {
		const { id } = useParams();
		const { findProduct } = useApi();
		const [ product, setProduct] = useState(null);

		const initFetch = useCallback(
				() => {
						const fetchProduct = async () => {
								const data = await findProduct(id);
								console.log(data);
								setProduct(data);
						}

						fetchProduct();
				},
				[findProduct, id],
		)

		useEffect(() => {
				initFetch();

				return () => {
						// no cleanup
				}
		}, [initFetch, id]);

		return(
				<div className="container-fluid">
						{(product)? <ProductDetail product={product}/>: <Fragment/>}
						{(product)? <ProductTags product={product}/>: <Fragment/>}
						{(product)? <ProductSpecs product={product}/>: <Fragment/>}
				</div>
		)
};

export default ProductPage;