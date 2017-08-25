import {createStore} from "redux";

const initialState = [];

const singleEventReducer = (event, action) => {
    switch (action.type) {
        case "ADD": {
            return {
                id: action.id,
                name: action.name
            };
        }
        default: {
            return event;
        }
    }
};

export const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD": {
            const newEvent = singleEventReducer(undefined, action);
            return [...state, newEvent];
        }

        default: {
            return state;
        }
    }
};

// todo check redux logger

const addEvent = (id, name) => ({
    type: "ADD",
    id,
    name
});

export const store = createStore(eventReducer);

console.log("initial state: ", store.getState());

store.subscribe(() => {
    console.log("new state: ", store.getState());
});

store.dispatch(addEvent(1, "test"));
store.dispatch(addEvent(2, "test"));
store.dispatch(addEvent(3, "test3"));