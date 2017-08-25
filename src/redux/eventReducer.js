import {createStore} from "redux";

// TODO why do I need var here?
var base64 = require('base-64');
var utf8 = require('utf8');

const INITIAL_STATE = [];
const ADD = "ADD";

const singleEventReducer = (event, action) => {
    switch (action.type) {
        case ADD: {
            return {
                id: action.id,
                name: utf8.decode(base64.decode(action.name))
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

export const addEvent = (id, name) => ({
    type: ADD,
    id,
    name
});

export const store = createStore(eventReducer);

store.subscribe(() => {
    console.log("new state: ", store.getState());
});