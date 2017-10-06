import React from "react";
import "./Event.css";

export const EventDescription = ({description, imageUrl}) => (
    <div className="eventDescription">
        <img src={imageUrl} alt="coverPicture"/>
        <pre>{description}</pre>
    </div>
);