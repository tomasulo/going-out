import React from "react";
import './Event.css';
import {EventDescription} from "./EventDescription";
import {EventHeader} from "./EventHeader";
import moment from 'moment';
import 'moment/locale/de';
import {Modal} from "semantic-ui-react";
import {Venue} from "./Venue";

export const Event = (props) => {
    let name = props.name;
    let startTime = moment(props.startTime).format('llll');
    let venue = props.venue;
    let description = props.description;
    let imageUrl = props.imageUrl;

    moment.locale('de');

    return (
        <div>
            <Modal trigger={<div className="event">
                <EventHeader name={name} startTime={startTime} venue={venue}/>
                <EventDescription imageUrl={imageUrl}/>
            </div>} closeIcon>
                <Modal.Header>{name}</Modal.Header>
                <Modal.Content image scrolling>
                    <Modal.Description>
                        <p>{startTime}</p>
                        <EventDescription description={description} imageUrl={imageUrl}/>
                        <Venue {...venue} />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </div>
    );
};