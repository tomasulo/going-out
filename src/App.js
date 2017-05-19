import React from "react";
import ReactModal from "react-modal";
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
    this.sendRequest = this.sendRequest.bind(this);
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

  sendRequest(lat, lng) {
    new Promise(resolve => {
      return request
        .get("http://localhost:3050/events")
        .query({ lat: lat })
        .query({ lng: lng })
        .query({ distance: this.state.distance })
        .query({ since: this.state.since.format("X") })
        .query({ until: this.state.until.format("X") })
        .query({ sort: "time" })
        .accept("json")
        .end(function(err, res) {
          if (err) throw err;
          if (res) {
            resolve(res.body.events);
          }
        });
    }).then(events => {
      console.log("Found " + events.length + " events");
      // TODO filter for existing events (id matches)
      // TODO sort by date
      var updated = this.state.events.concat(events);
      this.setState({
        events: updated
      });
    });
  }

  handleClick(e) {
    console.log("Handle click");

    this.setState({
      events: []
    });

    var munichCoordinates = [
      {
        lat: 48.131726,
        lng: 11.549377
      },
      {
        lat: 48.106973,
        lng: 11.558304
      },
      {
        lat: 48.135621,
        lng: 11.576328
      },
      {
        lat: 48.160818,
        lng: 11.549549
      },
      {
        lat: 48.170665,
        lng: 11.625423
      },
      {
        lat: 48.139745,
        lng: 11.623192
      },
      {
        lat: 48.112016,
        lng: 11.598473
      }
    ];

    munichCoordinates.map(item => {
      return this.sendRequest(item.lat, item.lng);
    });
  }

  render() {
    return (
      <div id="controller">
        <div className="header">
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
        </div>
        <EventContainer events={this.state.events} />
      </div>
    );
  }
}

class EventContainer extends React.Component {
  render() {
    return (
      <div id="eventContainer">
        {this.props.events.map(event => {
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
    );
  }
}

class Event extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div className="event" onClick={this.handleOpenModal}>
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
          <img src={this.props.coverPicture} alt="coverPicture" />
          <pre>
            {this.props.description}
          </pre>
        </div>

        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Event Details"
          onRequestClose={this.handleCloseModal}
          style={{
            content: {
              margin: "0 auto",
              width: "50%"
            }
          }}
        >
          <button onClick={this.handleCloseModal}>Close</button>

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
            <img src={this.props.coverPicture} alt="coverPicture" />
            <pre>
              {this.props.description}
            </pre>
          </div>
        </ReactModal>
      </div>
    );
  }
}
