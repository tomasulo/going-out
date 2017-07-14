import React from "react";
import Event from "./Event";
import moment from "moment";
import {TextFilter} from "react-text-filter";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

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
        moment.locale("de")
        this.state = {
            events: [],
            textFilter: '',
            dateFilter: moment.utc().format("MM/DD/YYYY")
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
        const hasTextFilter = !!this.state.textFilter;
        const hasDateFilter = !!this.state.dateFilter;
        console.log("date filter" + hasDateFilter);
        console.log("text filter" + hasTextFilter);

        var filteredEvents;
        if (hasTextFilter) {
            filteredEvents = this.state.events.filter(textFilter(this.state.textFilter));
        } else if (hasDateFilter) {
            filteredEvents = this.state.events.filter(dateFilter(this.state.dateFilter));
        } else {
            filteredEvents = this.state.events.slice(0);
        }

        return (
            <div>
                <DayPicker
                    className={"center"}
                    onDayClick={day => this.setState({dateFilter: moment.utc(day).format("MM/DD/YYYY")})}/>
                <br/>
                <div className="center">
                    <TextFilter
                        onFilter={({target: {value: textFilter}}) => this.setState({textFilter})}
                        placeholder="Search"
                        className="center"/>
                </div>
                <div id="eventContainer" className="center">
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