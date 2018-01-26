import React from "react";
import "./Event.css";
import {Venue} from "./Venue";
import {Icon} from "semantic-ui-react";

export const EventHeader = ({name, startTime, venue}) => (
    <div className="eventHeader">
        <h3>{name}</h3>
    </div>
);