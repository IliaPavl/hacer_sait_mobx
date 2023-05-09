import React from 'react';
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { HOME_PAGE } from '../const/Consts';
import './NavigationBar.css';

const NavigationBar = () => {
    return (
        <Navbar className='navBar'>
            <Container>
                <Navbar.Brand className='navBarBrendText'>
                    <img
                        alt=""
                        src="https://news.ycombinator.com/y18.gif"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Hacker News
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Link
                        className='navbar-brand justify-content-end d-flex nav-item'
                        to={HOME_PAGE}>
                        News
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;