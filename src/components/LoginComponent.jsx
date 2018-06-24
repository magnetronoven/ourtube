import React, { Component } from 'react'
import Context from '../Context';

import { Redirect } from "react-router-dom";

export default class LoginComponent extends Component {

  constructor() {
    super();
    this.state = {
      loginMessage: "",
      loginError: false,
      redirect: false
    }
  }

  loginMessage(error, msg) {
    this.setState({ loginMessage: msg, loginError: error });
  }

  onSubmit(e, context) {
    e.preventDefault();
    let data = {
      email: e.target.email.value,
      password: e.target.password.value
    }

    fetch('/login',
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {

        if (!data) {

          this.loginMessage(true, data.error.message)

        } else if (data.error) {

          this.loginMessage(true, data.error.message)

        } else {

          this.loginMessage(false, "You have logged in")

          context.setUser(data.data.email, data.data.firstname, data.data.infix, data.data.lastname, data.data.created, data.data.role);

          localStorage.setItem("token", data.token);

          this.setState({ redirect: true });
        }
      })
  }

  render() {

    // Redirect to /
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
    return (

      <Context.Consumer>
        {(context) => (
          <form onSubmit={e => this.onSubmit(e, context)} className="login-form">
            {this.state.loginMessage &&
              <div className={`${this.state.loginError ? 'login-error' : 'login-message'}`}>{this.state.loginMessage}</div>}
            <div className="form-group">
              <label>Email:</label>
              <input name="email" type="email" required />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input name="password" type="password" required />
            </div>
            <input type="submit" value="Submit" />
          </form>
        )}
      </Context.Consumer>
    )
  }
}
