import React, { Component } from 'react';
import Context from '../Context';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default class Account extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="flex-container">
          <Sidebar />
          <div className="content">
          <Context.Consumer>
            {(context) => (
              <React.Fragment>
                {context.loggedIn() ? 
                <React.Fragment>
                  <div>{context.state.user_firstname}</div>
                  <div>{context.state.user_lastname}</div>
                  <div>{new Date(context.state.user_created).toLocaleDateString()}</div>
                  <div>{context.state.user_role}</div>
                  <div>{context.state.user_email}</div>
                </React.Fragment>
                :
                <div>Not logged in</div>
                }
              </React.Fragment>
            )}
          </Context.Consumer>
          </div>
        </div>
      </div>
    )
  }
}
