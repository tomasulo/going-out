import React from "react";
import './Event.css';
import {EventDescription} from "./EventDescription";
import {EventHeader} from "./EventHeader";
import Modal from 'react-modal';
import moment from 'moment';
import 'moment/locale/de';

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };

        moment.locale('de');

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    // TODO refactor
    render() {
        let name = this.props.name;
        let startTime = moment(this.props.startTime).format('llll');
        let venue = this.props.venue;
        let description = this.props.description;
        let imageUrl = this.props.imageUrl;

        return (
            <div className="event" onClick={this.handleOpenModal}>
                <EventHeader name={name} startTime={startTime} venue={venue}/>
                <EventDescription description={description} imageUrl={imageUrl}/>

                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Event Details"
                    onRequestClose={this.handleCloseModal}
                    style={{
                        content: {
                            margin: "0 auto",
                            // TODO adjust width of modal dialog on mobile vs desktop
                            width: "60%",
                            borderRadius: "20px"
                        }
                    }}
                >
                    <button onClick={this.handleCloseModal}>Close</button>

                    <div className="modal-event">
                        <EventHeader name={name} startTime={startTime} venue={venue}/>
                        <EventDescription description={description} imageUrl={imageUrl}/>
                    </div>
                </Modal>
            </div>
        );

    }
}

export default Event;