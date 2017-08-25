import React from "react";
import ReactModal from "react-modal";

import { Venue } from "./Venue.js";
import { EventName } from "./EventName.js";
import { StartTime } from "./StartTime.js";

export default class Event extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <div>
                <div className="event" onClick={this.handleOpenModal}>
                    <div className="header">
                        <EventName name={this.props.name} />
                        <StartTime time={this.props.startTime} />
                        <Venue
                            name={this.props.venue.name}
                            street={this.props.venue.street}
                            zip={this.props.venue.zip}
                            city={this.props.city}
                        />
                    </div>
                    <div className="description">
                        <img src={this.props.coverPicture} alt="coverPicture" />
                        <pre>
                            {this.props.description}
                        </pre>
                    </div>
                </div>

                <ReactModal
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
                        <div className="header">
                            <h3>
                                {this.props.name}
                            </h3>
                            <p className="startTime">
                                {this.props.startTime}
                            </p>
                            <p className="venue">
                                <b>{this.props.venue.name}</b>
                                <br />
                                {this.props.venue.street}
                                <br />
                                {this.props.venue.zip}
                                , {this.props.city}
                            </p>
                        </div>
                        <div className="description">
                            <img
                                className="modal-image"
                                src={this.props.coverPicture}
                                alt="coverPicture"
                            />
                            <pre>
                                {this.props.description}
                            </pre>
                        </div>
                    </div>
                </ReactModal>
            </div>
        );
    }
}
