import {default as React, useCallback, useContext, useEffect, useState} from 'react';

import { useApi } from '../../services';
import ProductCard from "./ProductCard";
import './_card.scss';
import './_product.scss';


const ProductList = () => {
    const { findAllProducts, products, setProductData } = useApi();

    const initFetch = useCallback(
() => {
        const fetchProducts = async () => {
            await findAllProducts({
                    limit: 10,
                    skip: 1,
            });
        }
        fetchProducts();
        },
  [findAllProducts, 10],
    )

    useEffect(() => {
        initFetch();
    }, [])

    return (
        <div className="page-products">
		        {
		        		products.map((product, index) => {
						        return (
								        <ProductCard
													product={product}
													key={index}
								        />
								    )
				        })
		        }
        </div>
    )
}

export default ProductList;