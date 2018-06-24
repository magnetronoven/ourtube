import React, { Component } from 'react'
import Context from '../Context';
import { Link } from 'react-router-dom'

export default class componentName extends Component {
  render() {
    return (
      <div>
        <Context.Consumer>
          {(context) => {
            return (
              <Link to="/upload" style={{color:"white", textDecoration:"none"}}>Upload Video</Link>
            );
          }}
        </Context.Consumer>
      </div>
    )
  }
}
