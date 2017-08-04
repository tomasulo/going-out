import React from 'react';
import ReactModal from "react-modal";
import moment from "moment";

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
        this.setState({showModal: true});
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    render() {
        return (
            <div className="event" onClick={this.handleOpenModal}>
                <div className="header">
                    <h3>{this.props.name}</h3>
                    <p className="startTime">
                        {this.props.startTime}
                    </p>
                    <p className="venue">
                        <b>{this.props.venue.name}</b><br />
                        {this.props.venue.street}<br />
                        {this.props.venue.zip}
                        ,
                        {" "}
                        {this.props.venue.city}
                    </p>
                </div>
                <div className="description">
                    <img src={this.props.coverPicture} alt="coverPicture"/>
                    <pre>
            {this.props.description}
          </pre>
                </div>

                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Event Details"
                    onRequestClose={this.handleCloseModal}
                    style={{
                        content: {
                            margin: "0 auto",
                            width: "50%",
                            "border-radius": "20px"
                        }
                    }}
                >
                    <button onClick={this.handleCloseModal}>Close</button>

                    <div className="header">
                        <h3>{this.props.name}</h3>
                        <p className="startTime">
                            {moment(this.props.startTime).format("llll")}
                        </p>
                        <p className="venue">
                            {this.props.venue.name}<br />
                            {this.props.venue.street}<br />
                            {this.props.venue.postalcode}
                            ,
                            {" "}
                            {this.props.venue.city}
                        </p>
                    </div>
                    <div className="description">
                        <img src={this.props.coverPicture} alt="coverPicture"/>
                        <pre>
              {this.props.description}
            </pre>
                    </div>
                </ReactModal>
            </div>
        );
    }
}
