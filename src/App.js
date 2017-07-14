import React from "react";
import ReactGA from "react-ga"; // https://github.com/react-ga/react-ga
import moment from "moment";
import DocumentMeta from "react-document-meta";
import {TextFilter} from "react-text-filter";
import Event from "./components/Event";
import {browserHistory, BrowserRouter as Router, Link, Route} from "react-router-dom";

var base64 = require('base-64');
var utf8 = require('utf8');

const EventList = ({match}) => (
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
                        <Route path='/:city' component={EventList}/>
                    </div>
                </div>
            </Router>
        );
    }
}

class EventContainer extends React.Component {
    constructor() {
        super();
        moment.locale("de")
        this.state = {
            events: [],
            filter: '',
        };
        this.sendRequest = this.sendRequest.bind(this);
    }

    componentDidMount() {
        return this.sendRequest();
    }

    sendRequest() {

        var apigClientFactory = require('aws-api-gateway-client').default;

        var params = {}
        var additionalParams = {
            queryParams: {
                since: moment().utc().format()
            }
        }

        var city = this.props.city.toLowerCase()

        // TODO refactor
        if (city === "passau" || city === "munich") {
            var pathTemplate = '/events/' + city
        } else {
            // TODO render error
            console.log("City not supported yet")
            return
        }
        var method = "POST"

        var accessKey = process.env.REACT_APP_AWS_ACCESS_KEY
        var secretKey = process.env.REACT_APP_AWS_SECRET_KEY

        var apigClient = apigClientFactory.newClient({
            invokeUrl: 'https://6milz2rjp1.execute-api.eu-central-1.amazonaws.com/prod',
            accessKey: accessKey,
            secretKey: secretKey,
            region: 'eu-central-1'
        });

        apigClient.invokeApi(params, pathTemplate, method, additionalParams)
            .then(response => {
                const events = [];
                response.data.map((eventData) => {
                    var city = eventData.city.capitalize()
                    if (city === 'Munich') {
                        city = 'München'
                    }
                    events.push(
                        <Event
                            key={eventData.id}
                            description={utf8.decode(base64.decode(eventData.description))}
                            venue={eventData.venue}
                            name={utf8.decode(base64.decode(eventData.name))}
                            city={city}
                            startTime={moment.utc(eventData.startTime).local().format("llll")}
                            coverPicture={eventData.imageUrl}
                        />
                    );
                });

                console.log("Found " + events.length + " events");

                this.setState({
                    events: events
                });
            });
    }

    render() {
        const filteredEvents = this.state.filter ?
            this.state.events.filter(eventFilter(this.state.filter)) :
            this.state.events.slice(0);

        return (
            <div>
                <TextFilter
                    onFilter={({target: {value: filter}}) => this.setState({filter})}
                    placeholder="Filter"
                    className="event-filter"/>
                <div id="eventContainer">
                    {filteredEvents.map(event => {
                        return event;
                    })}
                </div>
            </div>
        );
    }
}

// TODO refactor
const eventFilter = filter => event =>
    event.props.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    || event.props.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    || event.props.venue.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
