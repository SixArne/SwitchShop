import React, {useState} from 'react';
import Filter from "./Filter";

import './_filter.scss';
import {useApi} from "../../services";

const knownGenreFilters = [
    {
        title: "Action",
    },
    {
        title: "Arcade",
    },
    {
        title: "Kids",
    },
    {
        title: "Platform",
    },
    ,
    {
        title: "RPG",
    },
];
const knownPEGIFilters = [
    {
        title: "3+",
    },
    {
        title: "5+",
    },
    {
        title: "7+",
    }
];

const Sidebar = () => {
    const { findAllProducts, setProductData } = useApi();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(Number.MAX_SAFE_INTEGER);

    const filterProducts = async () => {
        await findAllProducts({
            limit: 10,
            skip: 1,
            min,
            max,
        });
    };

    return (
        <div className="product-filter">
            <div className="filter-container">
                <div className="filter-prize">
                    <h1 className="filter-title">Prize</h1>
                    <div className="prize-filters">
                        <input type="text" placeholder="min" onChange={(ev) => setMin(ev.target.value)}/>
                        <input type="text" placeholder="max" onChange={(ev) => setMax(ev.target.value)}/>
                    </div>
                </div>
                <Filter
                    title="Genre"
                    filters={knownGenreFilters}
                />
                <Filter
                    title="PEGI Rating"
                    filters={knownPEGIFilters}
                />
            </div>
            <button className="filter-button" onClick={filterProducts}>
                Filter
            </button>
        </div>
    )
}

export default Sidebar;