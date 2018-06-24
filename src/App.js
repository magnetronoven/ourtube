import React, { Component } from 'react';
import Context from './Context';
import { BrowserRouter } from "react-router-dom";
import Routes from './routes/index.js';

import './App.css';

class Provider extends Component {

  state = {
    user_email: "",
    user_firstname: "",
    user_infix: "",
    user_lastname: "",
    user_created: "",
    user_role: ""
  }

  render() {
    return (
      <Context.Provider value={{
          // Global state
          state: this.state,

          changeValue: (element, value) => {
            this.setState({ [element]: value });
          },

          setUser: (email, firstname, infix, lastname, created, role) => {
            this.setState({
              user_email: email,
              user_firstname: firstname,
              user_infix: infix,
              user_lastname: lastname,
              user_created: created,
              user_role: role
            });
          },

          deleteUser: () => {
            this.setState({
              user_email: "",
              user_firstname: "",
              user_infix: "",
              user_lastname: "",
              user_created: "",
              user_role: ""
            });
          },

          loggedIn: () => this.state.user_email
        }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default class App extends Component {
  
  state = {
    autologin: false
  }

  // Triggers only first route when page loads
  autoLogin(context) {

    // Makes sure this function only runs once
    this.setState({autologin: true})

    if (localStorage.getItem('token')) {

      fetch('http://localhost:4000/autologin',
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          // Sets the jwt in the authorization header
          'authorization': localStorage.getItem('token')
        }
      })
      .then(res => {
        if(res.ok) {
          return res.json();
        } else {
          // Goes to catch when fails
          throw Error(res.statusText);
        }
      })
      .then(data => {
        context.setUser(data[0].email, data[0].firstname, data[0].infix, data[0].lastname, data[0].created, data[0].role);
      })
      // When it fails
      .catch(err => {
        console.log(err);
      })
    }
  }

  render() {
    return (
    <div className="app">
      <Provider>
        <Context.Consumer>
          {(context) => {
            !this.state.autologin && this.autoLogin(context);
            return (
            <BrowserRouter>
              <Routes />
            </BrowserRouter>)
          }}
        </Context.Consumer>
      </Provider>
    </div>
    )}
};