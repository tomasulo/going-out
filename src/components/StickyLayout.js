import React, {Component} from 'react'
import {Container, Dropdown, Header, Menu, Visibility,} from 'semantic-ui-react'
import {fetchEvents, setDateFilter} from "../actions";
import {eventStore} from "../reducers";
import {ALL, NEXT_WEEKEND, TODAY, TOMORROW} from "./header/DateSelector";
import {EventContainer} from "../containers/EventContainer";

const menuStyle = {
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    marginBottom: '2em',
    marginTop: '2em',
    transition: 'box-shadow 0.5s ease, padding 0.5s ease',
    display: 'block'
};

const fixedMenuStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
    display: 'block'
};

const cities = [
    {
        text: 'Munich',
        value: 'munich'
    },
    {
        text: 'Regensburg',
        value: 'regensburg'
    },
    {
        text: 'Passau',
        value: 'passau'
    }
];

const dateSelection = [
    {
        text: 'sometime',
        value: ALL
    },
    {
        text: 'today',
        value: TODAY
    },
    {
        text: 'tomorrow',
        value: TOMORROW
    },
    {
        text: 'next weekend',
        value: NEXT_WEEKEND
    }
];

export default class StickyLayout extends Component {
    state = {
        menuFixed: false,
        overlayFixed: false,
    };

    handleCityChange = (data) => {
        console.log(data);
        eventStore.dispatch(fetchEvents(data));
    };

    handleDateChange = (data) => {
        console.log(data);
        eventStore.dispatch(setDateFilter(data));
    };

    stickTopMenu = () => this.setState({menuFixed: true})
    unStickTopMenu = () => this.setState({menuFixed: false})

    render() {
        const {menuFixed} = this.state

        return (
            <Container>

                <Visibility onBottomPassed={this.stickTopMenu}
                            onBottomVisible={this.unStickTopMenu}
                            once={false}>
                    <Menu borderless fluid
                          fixed={menuFixed && 'top'}
                          style={menuFixed ? fixedMenuStyle : menuStyle}>
                        <Container text>
                            <Menu.Item header><Header as='h1'>I want to go out in &nbsp;
                                <Dropdown
                                    onChange={(param, data) => this.handleCityChange(data.value)}
                                    placeholder='where' pointing options={cities}
                                    inline/>
                                &nbsp;
                                <Dropdown onChange={(param, data) => this.handleDateChange(data.value)}
                                          placeholder='when' pointing
                                          options={dateSelection}
                                          inline/></Header></Menu.Item>
                        </Container>
                    </Menu>

                </Visibility>

                <Container>
                    <EventContainer/>
                </Container>

            </Container>

        )
    }
}
