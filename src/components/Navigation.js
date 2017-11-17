import React from 'react'
import {Link} from "react-router-dom";

export const Navigation = () => (
    <div className={"center"}>
        <Link to={'/munich'}><h3 className={"city-link"}>Munich</h3></Link>
        <Link to={'/passau'}><h3 className={"city-link"}>Passau</h3></Link>
        <Link to={'/regensburg'}><h3 className={"city-link"}>Regensburg</h3></Link>
    </div>
);