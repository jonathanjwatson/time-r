import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class CustomNav extends Component {
    componentWillMount(){
        console.log(this.props.token);
    }
    render() {
        if (!this.props.token){
            return (
                <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="/">time-r</a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav>
                  </Nav>
                  <Nav pullRight>
                          <NavItem eventKey={1} href="/login" onClick={ e => this.props.history.push("/login")}>Login</NavItem>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            );
        }
        else {
            return (
                <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="/">time-r</a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav>
                    <NavItem eventKey={1} href="#">Link</NavItem>
                    <NavItem eventKey={2} href="#">Link</NavItem>
                  </Nav>
                  <Nav pullRight>
                          <NavItem eventKey={1} onClick={this.props._removeCookies}href="/">Logout</NavItem>
                          <NavItem eventKey={1} href="/Dashboard">Dashboard</NavItem>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            );
        }
        
    }
}

export default CustomNav;