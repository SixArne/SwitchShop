import React, {useCallback, useEffect, useState} from 'react';
import {useApi} from "../../services";

const Filter = ({ title, filters }) => {
    return (
        <div className="filter">
            <h1 className="filter-title">{title}</h1>
                {
                    filters.map((filter) => <div className="filter-check">
                        <input type="checkbox"/>
                        <p>{filter.title}</p>
                    </div>)
                }
        </div>
    )
}

export default Filter;