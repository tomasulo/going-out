import React from 'react'
import './Header.css';
import {DateSelector} from "./DateSelector";
import {SearchBar} from "./SearchBar";

export const Header = ({city}) => (
    <div>
        <h1 className={"center"}>{city.toUpperCase()}</h1>
        <DateSelector/>
        <SearchBar/>
    </div>
);