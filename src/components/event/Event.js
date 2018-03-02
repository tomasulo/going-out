import React from "react";
import './Event.css';
import moment from 'moment';
import 'moment/locale/de';
import {Card, Container, Grid, Icon, Image, Modal} from "semantic-ui-react";
import {Venue} from "./Venue";

export const Event = (props) => {
    let name = props.name;
    let startTime = moment(props.startTime).format('llll');
    let endTime = moment(props.endTime).format('llll');
    let venue = props.venue;
    let description = props.description;
    let imageUrl = props.imageUrl;
    return (
        <Modal size={'tiny'} trigger={
            <Card className={"small"}>
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
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <Image centered src={imageUrl} size='small'/>
                            </Grid.Column>
                            <Grid.Column>
                                <Grid columns={2} centered>

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <Icon name={'marker'}/>
                                        </Grid.Column>
                                        <Grid.Column width={13}>
                                            <strong>{venue.name}</strong><br/>
                                            {venue.street}<br/>
                                            {venue.zip}, {venue.city === 'Munich' ? 'München' : venue.city}
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <Icon name={'play'}/>
                                        </Grid.Column>
                                        <Grid.Column width={13}>
                                            {startTime}
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <Icon name={'stop'}/>
                                        </Grid.Column>
                                        <Grid.Column width={13}>
                                            {endTime}
                                        </Grid.Column>
                                    </Grid.Row>

                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <br/>
                    <Container fluid>
                        <pre className={"eventText"}>{description}</pre>
                    </Container>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
};