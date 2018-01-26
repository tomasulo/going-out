import {Event} from "./Event";
import React from 'react'
import "./Event.css";
import {Card} from "semantic-ui-react";

const EventList = ({events}) => (
    <Card.Group className='centerItems'>
        {events.map(event => (
            <Event key={event.id} {...event} />
        ))}
    </Card.Group>
);

export default EventList;