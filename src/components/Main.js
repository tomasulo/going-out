import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import DocumentMeta from "react-document-meta";
import {Navigation} from "./Navigation";
import {Content} from "./Content";

const meta = {
    meta: {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
    }
};

export const Main = () => (
    <BrowserRouter>
        <div>
            <DocumentMeta {...meta} />
            <Route exact path='/' component={Navigation}/>
            <Route path='/:city' component={Content}/>
        </div>
    </BrowserRouter>
);