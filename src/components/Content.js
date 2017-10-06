import React from 'react'
import {fetchEvents} from "../actions/index";
import {EventContainer} from "../containers/EventContainer";
import {eventStore} from "../reducers/index";
import {Header} from "./header/Header";

// TODO think about how to do this differently
// e.g. Have one component for each city to be able to style them differently
export const Content = (props) => {
    let city = props.match.params.city;
    eventStore.dispatch(fetchEvents(props.match.params.city));
    return (
        <div>
            <Header city={city} />
            <EventContainer/>
        </div>
    )
};
