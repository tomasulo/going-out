import React from "react";
import Event from "./Event";
import moment from "moment";
import {TextFilter} from "react-text-filter";
import "react-day-picker/lib/style.css";

// TODO why do I need var here?
var base64 = require('base-64');
var utf8 = require('utf8');

const cities = ["munich", "passau", "regensburg"];

const textFilter = filter => event =>
event.props.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1
|| event.props.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
|| event.props.venue.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;

const dateFilter = filter => event =>
moment.utc(event.props.startTime).format("MM/DD/YYYY") === filter;

export default class EventContainer extends React.Component {
    constructor() {
        super();
        moment.locale("de");
        this.state = {
            events: [],
            filteredEvents: [],
            filteredByDate: false,
            textFilter: '',
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
                    let city = eventData.city.capitalize();
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
                    events: events,
                    filteredEvents: events
                });
            });
    }

    filterByToday = () => {
        console.log("Filter by today");
        let today = this.state.events.filter(dateFilter(moment.utc().format("MM/DD/YYYY")));
        this.setState({
            filteredEvents: today,
            filteredByDate: true
        });
    };

    filterByTomorrow = () => {
        console.log("Filter by tomorrow");
        let tomorrow = this.state.events.filter(dateFilter(moment.utc().add(1, 'days').format("MM/DD/YYYY")));
        this.setState({
            filteredEvents: tomorrow,
            filteredByDate: true
        });
    };

    filterByNextWeekend = () => {
        console.log("Filter by next weekend");
        let nextFri = this.state.events.filter(dateFilter(moment.utc().day(5).format("MM/DD/YYYY")));
        let nextSat = this.state.events.filter(dateFilter(moment.utc().day(6).format("MM/DD/YYYY")));
        let nextSun = this.state.events.filter(dateFilter(moment.utc().day(7).format("MM/DD/YYYY")));
        let nextWeekend = nextFri.concat(nextSat, nextSun);
        this.setState({
            filteredEvents: nextWeekend,
            filteredByDate: true
        });
    };

    render() {
        if (!!this.state.textFilter) {
            this.state.filteredEvents = this.state.events.filter(textFilter(this.state.textFilter));
            this.state.filteredByDate = false;
        } else if(!this.state.filteredByDate) {
            this.state.filteredEvents = this.state.events.slice(0);
        }
        return (
            <div>
                <button className="pure-button" onClick={() => this.filterByToday()}>
                    TODAY
                </button>
                <button className="pure-button" onClick={() => this.filterByTomorrow()}>
                    TOMORROW
                </button>
                <button className="pure-button" onClick={() => this.filterByNextWeekend()}>
                    NEXT WEEKEND
                </button>
                <br/>
                <br/>
                <div className="center">
                    <TextFilter
                        onFilter={({target: {value: textFilter}}) => this.setState({textFilter})}
                        placeholder="Search all"
                        className="center"/>
                </div>
                <div id="eventContainer" className="center">
                    {this.state.filteredEvents.map(event => {
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