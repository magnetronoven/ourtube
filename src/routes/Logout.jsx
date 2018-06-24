import React, { Component } from 'react'
import { Redirect } from "react-router-dom";

import Context from '../Context';

export default class Logout extends Component {
  render() {
    localStorage.removeItem('token')
    return (
      // Redirect to /
      <div>
        <Context.Consumer>
          {(context) => {
            context.deleteUser();
            return (
              <React.Fragment>
                Logging out...
                <Redirect to='/'/>
              </React.Fragment>
            );
          }}
        </Context.Consumer>
      </div>
    )
  }
}
