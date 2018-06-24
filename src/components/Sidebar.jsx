import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Context from '../Context';

export default class Sidebar extends Component {
  render() {

    return (
      <div className="sidebar">
        <Context.Consumer>
          {(context) => {
            return (
              
              <React.Fragment>
                {!context.loggedIn() ?
                  <React.Fragment>
                    <NavLink exact to={`/`} activeClassName="active">Home</NavLink>
                    <NavLink exact to={`/login`} activeClassName="active">Login</NavLink>
                    <NavLink exact to={`/register`} activeClassName="active">Register</NavLink>
                  </React.Fragment>
                : 
                <React.Fragment>
                  <NavLink exact to={`/`} activeClassName="active">Home</NavLink>
                  <NavLink exact to={`/account`} activeClassName="active">Account</NavLink>
                  <NavLink exact to={`/logout`} activeClassName="active">Logout</NavLink>
                </React.Fragment>}
              </React.Fragment>
            )
          }}
        </Context.Consumer>
      </div>
    )
  }
}
