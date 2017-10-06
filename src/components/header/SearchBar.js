import React from 'react'
import {TextFilter} from "react-text-filter";
import {setTextFilter} from "../../actions/index";
import {eventStore} from "../../reducers/index";

export const SearchBar = () => (
    <div className="searchBar">
        <TextFilter
            placeholder="SEARCH"
            className="center"
            onFilter={({target: {value: textFilter}}) => eventStore.dispatch(setTextFilter(textFilter))}
        />
    </div>
);

