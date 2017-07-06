import React from "react";
import ReactGA from 'react-ga'; // https://github.com/react-ga/react-ga
import request from "superagent";
import moment from "moment";
import DocumentMeta from "react-document-meta";

import NotFound from './components/NotFound';
import Event from './components/Event';

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect,
  browserHistory
} from 'react-router-dom'

var base64 = require('base-64');
var utf8 = require('utf8');

const Munich = () => (
  <h1>MUNICH</h1>
)

const Passau = () => (
  <h1>PASSAU</h1>
)

export default class App extends React.Component {
  constructor() {
    super();

    moment.locale("de");

    this.state = {
      events: []
    };

    this.sendRequest = this.sendRequest.bind(this);

    // Add your tracking ID created from https://analytics.google.com/analytics/web/#home/
    ReactGA.initialize('UA-56053032-2');
    // This just needs to be called once since we have no routes in this case.
    // TODO make this work on every page?
    ReactGA.pageview(window.location.pathname);
  }

  sendRequest() {
    var apigClientFactory = require('aws-api-gateway-client').default;

    var params = {}
    var additionalParams = {
      queryParams: {
        since:  moment().utc().format()
      }
    }
    var pathTemplate = '/events/Munich'
    var method = "POST"

    var accessKey = process.env.REACT_APP_AWS_ACCESS_KEY
    var secretKey = process.env.REACT_APP_AWS_SECRET_KEY

    var apigClient = apigClientFactory.newClient({
      invokeUrl: 'https://6milz2rjp1.execute-api.eu-central-1.amazonaws.com/prod',
      accessKey: accessKey,
      secretKey: secretKey,
      region: 'eu-central-1'
    });

    // TODO add Promise
    apigClient.invokeApi(params, pathTemplate, method, additionalParams)
      .then(response => {
        var events = response.data
        console.log("Found " + events.length + " events");
        console.log(events);
        this.setState({
          events: events
        });
      });
  }

  componentDidMount() {
    this.setState({
      events: []
    });

    return this.sendRequest();  
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
            <Route path="/munich" component={Munich}/>
            <Route path="/passau" component={Passau}/>
          </div>
          <EventContainer events={this.state.events} />
        </div>
      </Router>
  );
  }
}

const EventList = () => {
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
              name={utf8.decode(base64.decode(event.name))}
              city={event.city}
              startTime={moment.utc(event.startTime).local().format("llll")}
              coverPicture={event.imageUrl}
            />
          );
        })}
      </div>
    );
  }
}


