import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../style/app.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }


  render() {
    const { isAuthenticated } = this.props.auth;

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
      { 
        isAuthenticated() && (
        <Nav>
          <NavItem componentClass='span'><Link to="/boards" >Boards</Link></NavItem>
        </Nav>
        )
      }
        { 
          !isAuthenticated() && (
          <Nav>
              <NavItem 
               onClick={this.login.bind(this)} 
              >  Log In
              </NavItem>
           </Nav>
          )
        }
        { 
          isAuthenticated() && (
          <Nav>
              <NavItem 
               onClick={this.logout.bind(this)} 
              >  Log Out
              </NavItem>
           </Nav>
          )
        }
      </Navbar.Collapse>
    </Navbar>
      </div>
    );
  }
}

export default App;
