import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../style/app.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
  }

  logout() {
  }

  render() {

    return (
      <div className="navbar"> 
      <Navbar  inverse collapseOnSelect fluid>
      <Navbar.Header>
        <Navbar.Brand>
          Weather App
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem><Link to="/">Boards</Link></NavItem>
        </Nav>
        <Nav>
          <NavItem>Log Out</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
      </div>
    );
  }
}

export default App;
