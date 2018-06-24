import React, { Component } from 'react'

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import LoginComponent from '../components/LoginComponent';

export default class Login extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="flex-container">
          <Sidebar />
          <div className="content">
            <h1>Login</h1>
            <LoginComponent />
          </div>
        </div>
      </div>
    )
  }
}
