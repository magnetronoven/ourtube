import React, { Component } from 'react'
import UploadVideo from './UploadVideo';

export default class Header extends Component {
  
  toggleSidebar() {
    document.querySelector(".sidebar").classList.toggle("sidebarOut");
  }

  render() {
    return (
      <div className="header">
        <ul className="headerul">
          <li>
            <span className="hamburger" onClick={this.toggleSidebar}>
              <i className="fas fa-bars" style={{height: "100%", cursor: "pointer"}}></i>
            </span>
          </li>
          <li>
            <p>Header</p>
          </li>
          <li>
            <UploadVideo />
          </li>
        </ul>
      </div>
    )
  }
}
