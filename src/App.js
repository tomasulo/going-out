import React from "react";
import request from "superagent";
import moment from "moment";

export default class App extends React.Component {
  constructor() {
    super();
    moment.locale("de");
    this.state = {
      events: [],
      lat: "48.13340", // Munich
      lng: "11.56681",
      distance: "2000",
      since: moment(),
      until: moment().add(1, "days")
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log("Handle change");

    switch (e.target.value) {
      case "tomorrow":
        this.setState({
          since: moment().add(1, "days"),
          until: moment().add(2, "days")
        });
        break;

      case "next_weekend":
        const friday = 5;
        this.setState({
          since: moment().add(1, "weeks").isoWeekday(friday),
          until: moment().add(1, "weeks").isoWeekday(friday).add(2, "days")
        });
        break;

      default:
        this.setState({
          since: moment(),
          until: moment().add(1, "days")
        });
    }
  }

  handleClick(e) {
    console.log("Handle click");
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
        self.setState({ events: res.body.events });
      });
  }

  render() {
    return (
      <div id="controller">
        <h1>I WANT TO GO OUT</h1>
        <h1>IN MUNICH</h1>
        <select
          defaultValue={this.state.selectValue}
          onChange={this.handleChange}
        >
          <option value="today">TODAY</option>
          <option value="tomorrow">TOMORROW</option>
          <option value="next_weekend">NEXT WEEKEND</option>
        </select>

        <div>
          <p />
          <button onClick={this.handleClick}>Find events</button>
        </div>

        <EventContainer events={this.state.events} />
      </div>
    );
  }
}

class EventContainer extends React.Component {
  render() {
    var leftItems = [];
    var rightItems = [];

    this.props.events.map(function(event, index) {
      if (index % 2 === 0) {
        leftItems.push(event);
      } else {
        rightItems.push(event);
      }
    });

    return (
      <div id="eventContainer">
        <div className="left">
          {leftItems.map(function(event) {
            return (
              <Event
                key={event.id}
                description={event.description}
                venue={event.venue}
                name={event.name}
                startTime={event.startTime}
                coverPicture={event.coverPicture}
              />
            );
          })}
        </div>

        <div className="right">
          {rightItems.map(function(event) {
            return (
              <Event
                key={event.id}
                description={event.description}
                venue={event.venue}
                name={event.name}
                startTime={event.startTime}
                coverPicture={event.coverPicture}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

class Event extends React.Component {
  render() {
    return (
      <div className="event">
        <div className="header">
          <h3>{this.props.name}</h3>
          <p className="startTime">
            {moment(this.props.startTime).format("llll")}
          </p>
          <p className="venue">
            {this.props.venue.name}<br />
            {this.props.venue.location.street}<br />
            {this.props.venue.location.zip}
            ,
            {" "}
            {this.props.venue.location.city}
          </p>
        </div>
        <div className="description">
          <img src={this.props.coverPicture} alt="coverPicture" width="250px" />
          <pre>
            {this.props.description}
          </pre>
        </div>
      </div>
    );
  }
}
