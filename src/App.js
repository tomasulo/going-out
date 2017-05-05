import React from "react";
import request from "superagent";
import moment from "moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class App extends React.Component {
  constructor() {
    super();

    moment.locale("de");

    this.state = {
      events: [],
      lat: "48.13340",
      lng: "11.56681",
      distance: "5000",
      since: moment(),
      until: moment().add(2, "days")
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSinceChange = this.handleSinceChange.bind(this);
    this.handleUntilChange = this.handleUntilChange.bind(this);
  }

  handleSinceChange(date) {
    this.setState({
      since: date
    });
  }

  handleUntilChange(date) {
    this.setState({
      until: date
    });
  }

  onChange(event) {
    var value = event.target.value;
    var name = event.target.name;

    switch (name) {
      case "lat":
        this.setState({ lat: value });
        break;
      case "lng":
        this.setState({ lng: value });
        break;
      case "distance":
        this.setState({ distance: value });
        break;
      default:
        console.log("Could not find input field for " + name);
    }
  }

  onClick(event) {
    console.log("Clicked");

    var self = this;

    request
      .get("http://localhost:3050/events")
      .query({ lat: self.state.lat })
      .query({ lng: self.state.lng })
      .query({ distance: self.state.distance })
      .query({ since: self.state.since.format("X") })
      .query({ until: self.state.until.format("X") })
      .query({ sort: "time" })
      .accept("json")
      .end(function(err, res) {
        if (err) throw err;

        console.log(res.body.events);

        self.setState({ events: res.body.events });
      });
  }

  render() {
    return (
      <div>
        <p>
          Latitude:
          {" "}
          <input
            type="text"
            name="lat"
            value={this.state.lat}
            onChange={this.onChange}
          />
        </p>
        <p>
          Longitude:
          {" "}
          <input
            type="text"
            name="lng"
            value={this.state.lng}
            onChange={this.onChange}
          />
        </p>
        <p>
          Distance:
          {" "}
          <input
            type="text"
            name="distance"
            value={this.state.distance}
            onChange={this.onChange}
          />
        </p>

        <div>
          Since:
          {" "}
          <DatePicker
            selected={this.state.since}
            onChange={this.handleSinceChange}
            dateFormatCalendar="DD/MM/YYYY"
          />
          <p />
        </div>

        <div>
          Until:
          {" "}
          <DatePicker
            selected={this.state.until}
            onChange={this.handleUntilChange}
            dateFormatCalendar="DD/MM/YYYY"
          />
          <p />
        </div>

        <button onClick={this.onClick}>Find events</button>
        <ul>
          {this.state.events.map(function(event) {
            return (
              <li key={event.id}>
                {event.name}
                :
                {" "}
                {moment(event.startTime).format("llll")}
                <p>{event.description}</p>
              </li>
            );
          })}

        </ul>
      </div>
    );
  }
}

function toUnix(date) {
  return Date.parse(date) / 1000;
}
