import React, {Component} from 'react'
import {Container, Divider, Dropdown, Header, Menu, Search, Visibility,} from 'semantic-ui-react'
import {fetchEvents, setDateFilter, setTextFilter} from "../actions";
import {eventStore} from "../reducers";
import {EventContainer} from "../containers/EventContainer";

export const DATE_FILTER_FORMAT = "DD/MM/YYYY";
export const TODAY = "today";
export const TOMORROW = "tomorrow";
export const NEXT_WEEKEND = "next_weekend";
export const ALL = "all";

const menuStyle = {
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    marginBottom: '2em',
    marginTop: '2em',
    transition: 'box-shadow 0.5s ease, padding 0.5s ease',
};

const fixedMenuStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};

const centered = {
    margin: 'auto'
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
        eventStore.dispatch(fetchEvents(data));
    };

    handleDateChange = (data) => {
        eventStore.dispatch(setDateFilter(data));
    };

    handleSearchChange = (e, {value}) => {
        eventStore.dispatch(setTextFilter(value));
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
                    <Menu borderless fluid vertical
                          fixed={menuFixed && 'top'}
                          style={menuFixed ? fixedMenuStyle : menuStyle}>
                        <Container text>
                            <Menu.Item header style={centered}>
                                <Header as='h1'>I want to go out in &nbsp;
                                    <Dropdown
                                        onChange={(param, data) => this.handleCityChange(data.value)}
                                        placeholder='where' pointing options={cities}
                                        inline/>
                                    &nbsp;
                                    <Dropdown onChange={(param, data) => this.handleDateChange(data.value)}
                                              placeholder='when' pointing
                                              options={dateSelection}
                                              inline/></Header>
                            </Menu.Item>
                            <Menu.Item style={centered}>
                                <Search
                                    onSearchChange={this.handleSearchChange}
                                    showNoResults={false}
                                />
                            </Menu.Item>
                        </Container>
                    </Menu>
                </Visibility>
                <Container>
                    <Divider/>
                    <EventContainer/>
                </Container>
            </Container>

        )
    }
}
