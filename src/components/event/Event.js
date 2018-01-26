import React from "react";
import './Event.css';
import {EventDescription} from "./EventDescription";
import moment from 'moment';
import 'moment/locale/de';
import {Card, Image, Modal} from "semantic-ui-react";
import {Venue} from "./Venue";

export const Event = (props) => {
    let name = props.name;
    let startTime = moment(props.startTime).format('llll');
    let venue = props.venue;
    let description = props.description;
    let imageUrl = props.imageUrl;
    moment.locale('de');

    return (
        <Modal trigger={
            <Card>
                <Image src={props.imageUrl} size='medium'/>
                <Card.Content>
                    <Card.Header>{props.name}</Card.Header>
                    <Card.Meta>
                        <span className='date'>
                            {moment(props.startTime).format('llll')}
                        </span>
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Venue {...props.venue} />
                </Card.Content>
            </Card>
        } closeIcon>
            <Modal.Header>{name}</Modal.Header>
            <Modal.Content image scrolling>
                <Modal.Description>
                    <p>{startTime}</p>
                    <EventDescription description={description} imageUrl={imageUrl}/>
                    <Venue {...venue} />
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
};