import React from "react";
import ReactModal from "react-modal";
import request from "superagent";
import moment from "moment";
import DocumentMeta from "react-document-meta";

var base64 = require('base-64');
var utf8 = require('utf8');

export default class App extends React.Component {
  constructor() {
    super();
    moment.locale("de");
    this.state = {
      events: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  sendRequest() {
    var apiUrl =
      "https://6milz2rjp1.execute-api.eu-central-1.amazonaws.com/prod/events";

    new Promise(resolve => {
      return request
        .post(apiUrl + "/Munich")
        .query({ since: moment().toISOString() })
        .accept("json")
        .end(function(err, res) {
          if (err) throw err;
          if (res) {
            resolve(res.body);
          }
        });
    }).then(events => {

      console.log("Found " + events.length + " events");
      // TODO filter for existing events (id matches)
      // TODO sort by date

      console.log(events);

      this.setState({
        events: events
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
      return this.sendRequest();
    });
  }

  render() {
    const meta = {
      meta: {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
      }
    };

    return (
      <div id="controller">
        <DocumentMeta {...meta} />
        <div className="header">
          <h1>I WANT TO GO OUT</h1>
          <h1>IN MUNICH</h1>
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
              description={utf8.decode(base64.decode(event.description))}
              venue={event.venue}
              name={event.name}
              city={event.city}
              startTime={event.since}
              coverPicture={event.imageUrl}
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
            {moment(this.props.since).format("llll")}
          </p>
          <p className="venue">
            <b>{this.props.venue.name}</b><br />
            {this.props.venue.street}<br />
            {this.props.venue.postalcode}
            ,
            {" "}
            {this.props.city}
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
              {this.props.venue.street}<br />
              {this.props.venue.postalcode}
              ,
              {" "}
              {this.props.city}
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
