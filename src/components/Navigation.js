import React from 'react'
import {Link} from "react-router-dom";

export const Navigation = () => (
    <div>
        <Link to={'/munich'}><h3>Munich</h3></Link>
        <Link to={'/passau'}><h3>Passau</h3></Link>
        <Link to={'/regensburg'}><h3>Regensburg</h3></Link>
    </div>
);