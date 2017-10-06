import React from "react";
import './Event.css';
import {EventDescription} from "./EventDescription";
import {EventHeader} from "./EventHeader";

export const Event = ({name, startTime, description, imageUrl, venue}) => (
    <div className="event">
        <EventHeader name={name} startTime={startTime} venue={venue}/>
        <EventDescription description={description} imageUrl={imageUrl}/>
    </div>
);
