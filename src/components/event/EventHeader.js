import React from "react";
import "./Event.css";
import {Venue} from "./Venue";

export const EventHeader = ({name, startTime, venue}) => (
    <div className="eventHeader">
        <h3>{name}</h3>
        <p>{startTime}</p>
        <Venue {...venue} />
    </div>
);