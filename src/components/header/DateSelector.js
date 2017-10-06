import React from 'react'
import './Header.css';
import {setDateFilter} from "../../actions/index";
import {eventStore} from "../../reducers/index";

export const DATE_FILTER_FORMAT = "DD/MM/YYYY";
export const TODAY = "today";
export const TOMORROW = "tomorrow";
export const NEXT_WEEKEND = "next_weekend";
export const ALL = "all";

export const DateSelector = () => (
    <div className="dateFilter">
        <button className="button -regular" onClick={(e) => eventStore.dispatch(setDateFilter(TODAY))}>
            TODAY
        </button>
        <button className="button -regular" onClick={(e) => eventStore.dispatch(setDateFilter(TOMORROW))}>
            TOMORROW
        </button>
        <button className="button -regular" onClick={(e) => eventStore.dispatch(setDateFilter(NEXT_WEEKEND))}>
            NEXT WEEKEND
        </button>
        <button className="button -regular" onClick={(e) => eventStore.dispatch(setDateFilter(ALL))}>
            ALL
        </button>
    </div>
);
;