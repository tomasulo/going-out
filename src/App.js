import React from "react";
import ReactGA from "react-ga"; // https://github.com/react-ga/react-ga
import DocumentMeta from "react-document-meta";

import EventContainer from "./components/EventContainer";

import {browserHistory, BrowserRouter as Router, Link, Route} from "react-router-dom";

const Events = ({match}) => (
    <div>
        <h1>{match.params.city.toUpperCase()}</h1>
        <EventContainer city={match.params.city.toUpperCase()}/>
    </div>
)

export default class App extends React.Component {
    constructor() {
        super();
        // Add your tracking ID created from https://analytics.google.com/analytics/web/#home/
        ReactGA.initialize('UA-56053032-2');
        // This just needs to be called once since we have no routes in this case.
        // TODO make this work on every page?
        ReactGA.pageview(window.location.pathname);
    }

    render() {
        const meta = {
            meta: {
                name: "viewport",
                content: "width=device-width, initial-scale=1.0"
            }
        };

        return (
            <Router history={browserHistory}>
                <div id="controller">
                    <DocumentMeta {...meta} />
                    <div className="header">
                        <h1>I WANT TO GO OUT IN</h1>
                        <hr/>
                        <Route exact={true} path="/" render={() => (
                            <div>
                                <Link to={'/munich'}><h3>Munich</h3></Link>
                                <Link to={'/passau'}><h3>Passau</h3></Link>
                            </div>
                        )}/>
                        <Route path='/:city' component={Events}/>
                    </div>
                </div>
            </Router>
        );
    }
}