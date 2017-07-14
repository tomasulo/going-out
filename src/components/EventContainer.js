import React from "react";
import Event from "./Event";
import moment from "moment";
import {TextFilter} from "react-text-filter";

// TODO why do I need var here?
var base64 = require('base-64');
var utf8 = require('utf8');

const cities = ["munich", "passau", "regensburg"];

const eventFilter = filter => event =>
event.props.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1
|| event.props.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
|| event.props.venue.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;

export default class EventContainer extends React.Component {
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

        if (cities.includes(city)) {
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
                const events = response.data.map((eventData) => {
                    var city = eventData.city.capitalize()
                    if (city === 'Munich') {
                        city = 'München'
                    }
                    return <Event
                        key={eventData.id}
                        description={utf8.decode(base64.decode(eventData.description))}
                        venue={eventData.venue}
                        name={utf8.decode(base64.decode(eventData.name))}
                        city={city}
                        startTime={moment.utc(eventData.startTime).local().format("llll")}
                        coverPicture={eventData.imageUrl}
                    />
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

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};