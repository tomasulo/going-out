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
    console.log(e.target.value);

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
        self.setState({ events: res.body.events });
      });
  }

  render() {
    return (
      <div>
        <h2>I WANT TO <em>GO OUT</em></h2>
        <h2>IN <em>MUNICH</em></h2>

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
          <ul>
            {this.state.events.map(function(event) {
              return (
                <li key={event.id}>
                  {event.name}
                  :
                  {" "}
                  {moment(event.startTime).format("llll")}
                  <p>{event.venue.name}</p>
                  <p>{event.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
