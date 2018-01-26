import React from 'react'
import './Header.css';
import {Container, Divider, Header,} from 'semantic-ui-react'

const menuStyle = {
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    marginBottom: '1em',
    marginTop: '4em',
    transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}

const fixedMenuStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
}

const overlayStyle = {
    float: 'left',
    margin: '0em 3em 1em 0em',
}

const fixedOverlayStyle = {
    ...overlayStyle,
    position: 'fixed',
    top: '80px',
    zIndex: 10,
}

const overlayMenuStyle = {
    position: 'relative',
    left: 0,
    transition: 'left 0.5s ease',
}

const fixedOverlayMenuStyle = {
    ...overlayMenuStyle,
    left: '800px',
}

export const Headline = () => (
    <div>
        <Container text style={{marginTop: '2em'}}>
            <Header as='h1'>I WANT TO GO OUT IN</Header>
            <Divider/>
        </Container>
        <Menu
            borderless
            fixed={menuFixed && 'top'}
            style={menuFixed ? fixedMenuStyle : menuStyle}
        >
            <Container text>
                <Menu.Item>
                    <Image size='mini' src='/logo.png'/>
                </Menu.Item>
                <Menu.Item header>Project Name</Menu.Item>
                <Menu.Item as='a'>Blog</Menu.Item>
                <Menu.Item as='a'>Articles</Menu.Item>

                <Menu.Menu position='right'>
                    <Dropdown text='Dropdown' pointing className='link item'>
                        <Dropdown.Menu>
                            <Dropdown.Item>List Item</Dropdown.Item>
                            <Dropdown.Item>List Item</Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Header>Header Item</Dropdown.Header>
                            <Dropdown.Item>
                                <i className='dropdown icon'/>
                                <span className='text'>Submenu</span>
                                <Dropdown.Menu>
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Item>
                            <Dropdown.Item>List Item</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Container>
        </Menu>
    </div>
);