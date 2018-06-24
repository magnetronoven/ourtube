import React, { Component } from 'react';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import RegisterComponent from '../components/RegisterComponent';

export default class Register extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="flex-container">
          <Sidebar />
          <div className="content">
            <h1>Register</h1>
            <RegisterComponent />
          </div>
        </div>
      </div>
    )
  }
}