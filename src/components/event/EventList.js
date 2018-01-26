import {Event} from "./Event";
import React from 'react'
import "./Event.css";

const EventList = ({events}) => (
    <div className="eventContainer">
        {events.map(event => (
            <Event key={event.id} {...event} />
        ))}
    </div>
);

export default EventList;