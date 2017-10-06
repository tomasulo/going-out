import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {RECEIVE_EVENTS, REQUEST_EVENTS, SET_DATE_FILTER, SET_TEXT_FILTER} from "../actions/index";
import base64 from 'base-64';
import utf8 from 'utf8';
import moment from 'moment';

const events = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {

        case REQUEST_EVENTS:
            return {
                ...state,
                isFetching: true,
                city: action.city
            };

        case RECEIVE_EVENTS:
            const events = action.events.map((event) => {
                return {
                    ...event,
                    name: utf8.decode(base64.decode(event.name)),
                    description: utf8.decode(base64.decode(event.description)),
                    startTime: moment(event.startTime).format('llll'),
                    venue: {
                        ...event.venue,
                        name: utf8.decode(base64.decode(event.venue.name))
                    },
                };
            });
            return {
                ...state,
                isFetching: false,
                lastUpdated: action.receivedAt,
                items: events
            };

        case SET_TEXT_FILTER:
            return {
                ...state,
                textFilter: action.textFilter
            };

        case SET_DATE_FILTER:
            return {
                ...state,
                dateFilter: action.dateFilter
            };

        default:
            return state;
    }
};

const loggerMiddleware = createLogger();

export const eventStore = createStore(
    events,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    ));