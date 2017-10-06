import Event from "./Event";
import React from 'react'
import "./Event.css";

const EventList = ({events, isFetching}) => (
    <div className="eventContainer">
        {events.map(event => (
            <Event key={event.id} {...event} />
        ))}
    </div>
);

export default EventList;