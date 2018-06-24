import React, { Component } from 'react'

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default class Upload extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="flex-container">
          <Sidebar />
          <div className="content">
            <h1>Upload Video</h1>
            
          </div>
        </div>
      </div>
    )
  }
}