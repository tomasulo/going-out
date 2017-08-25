import { createStore } from "redux";
import moment from "moment";

// TODO why do I need var here?
var base64 = require("base-64");
var utf8 = require("utf8");

const INITIAL_STATE = [];
const ADD = "ADD";

const singleEventReducer = (event, action) => {
	switch (action.type) {
		case ADD: {
			return {
				id: action.id,
				name: utf8.decode(base64.decode(action.name)),
                city: action.city,
                description: utf8.decode(base64.decode(action.description)),
                venue: action.venue,
                startTime: moment.utc(action.startTime).local().format("llll"),
                coverPicture: action.coverPicture
			};
		}
		default: {
			return event;
		}
	}
};

export const eventReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD: {
			const newEvent = singleEventReducer(undefined, action);
			return [...state, newEvent];
		}

		default: {
			return state;
		}
	}
};

// key={eventData.id}
// city={city}
// description={utf8.decode(base64.decode(eventData.description))}
// venue={eventData.venue}
// name={utf8.decode(base64.decode(eventData.name))}
// startTime={moment.utc(eventData.startTime).local().format("llll")}
// coverPicture={eventData.imageUrl}

export const addEvent = (
	id,
	city,
	description,
	venue,
	name,
	startTime,
	coverPicture
) => ({
	type: ADD,
	id,
	city,
	description,
	venue,
	name,
	startTime,
	coverPicture
});

export const store = createStore(eventReducer);

store.subscribe(() => {
	console.log("new state: ", store.getState());
});
