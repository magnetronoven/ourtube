import React, { Component } from 'react';
import Context from '../Context';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default class Home extends Component {

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
                  <div>Welcome to OURTUBE here some video's (not supported yet)</div>
                </React.Fragment>
                :
                <div>Welcome to OURTUBE here some video's (not supported yet)</div>
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
