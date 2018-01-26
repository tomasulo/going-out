import React, {Component} from 'react'
import {Container, Dropdown, Header, Menu, Visibility,} from 'semantic-ui-react'
import {Content} from "./Content";
import {fetchEvents, setDateFilter} from "../actions";
import {eventStore} from "../reducers";
import {ALL, NEXT_WEEKEND, TODAY, TOMORROW} from "./header/DateSelector";

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
            <div>
                {/* Heads up, style below isn't necessary for correct work of example, simply our docs defines other
            background color.
          */}
                <style>{`
          html, body {
            background: #fff;
          }
        `}</style>

                {/* Attaching the top menu is a simple operation, we only switch `fixed` prop add add another styles if it has
            gone beyond the scope of visibility
          */}
                <Visibility
                    onBottomPassed={this.stickTopMenu}
                    onBottomVisible={this.unStickTopMenu}
                    once={false}
                >
                    <Menu
                        borderless
                        fixed={menuFixed && 'top'}
                        style={menuFixed ? fixedMenuStyle : menuStyle}
                    >
                        <Container text>
                            <Menu.Item header><Header as='h1'>I want to go out in</Header></Menu.Item>
                            <Menu.Menu>
                                <Dropdown onChange={(param, data) => this.handleCityChange(data.value)}
                                          placeholder='where' pointing options={cities}
                                          className='link item header'/>
                            </Menu.Menu>
                            <Menu.Menu>
                                <Dropdown onChange={(param, data) => this.handleDateChange(data.value)}
                                          placeholder='when' pointing
                                          options={dateSelection}
                                          className='link item header'/>
                            </Menu.Menu>
                        </Container>
                    </Menu>
                </Visibility>

                <Container text>

                    <Content/>

                    {/*{_.times(3, i => <Paragraph key={i}/>)}*/}

                    {/*/!* Example with overlay menu is more complex, SUI simply clones all elements inside, but we should use a*/}
                    {/*different approach.*/}

                    {/*An empty Visibility element controls the need to change the fixing of element below, it also uses height*/}
                    {/*and width params received from its ref for correct display.*/}
                    {/**!/*/}
                    {/*<Visibility*/}
                    {/*offset={80}*/}
                    {/*once={false}*/}
                    {/*onTopPassed={this.stickOverlay}*/}
                    {/*onTopVisible={this.unStickOverlay}*/}
                    {/*style={overlayFixed ? {...overlayStyle, ...overlayRect} : {}}*/}
                    {/*/>*/}

                    {/*{_.times(3, i => <Paragraph key={i}/>)}*/}
                    {/*<LeftImage/>*/}

                    {/*<Paragraph/>*/}
                    {/*<RightImage/>*/}

                    {/*{_.times(4, i => <Paragraph key={i}/>)}*/}
                    {/*<LeftImage/>*/}

                    {/*<Paragraph/>*/}
                    {/*<RightImage/>*/}

                    {/*{_.times(2, i => <Paragraph key={i}/>)}*/}
                </Container>
            </div>
        )
    }
}
