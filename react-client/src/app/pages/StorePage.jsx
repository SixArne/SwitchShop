import React from "react";
import { ProductList } from "../components/Product";
import { Sidebar } from '../components/Sidebar';

const StorePage = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-3 col-sm-12">
                    <Sidebar/>
                </div>
                <div className="col-xl-9 col-sm-12">
                    <ProductList/>
                </div>
            </div>
        </div>
    )
};

export default StorePage;