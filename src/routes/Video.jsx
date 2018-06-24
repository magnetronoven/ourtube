import React, { Component } from 'react'
import Context from '../Context';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Player } from 'video-react';
import "../../node_modules/video-react/dist/video-react.css"; // import css

class Video extends Component {
  constructor(props) {
    super(props)
    // fetch()
  }

  render() {
    return (
      <div>
        <Header />
        <div className="flex-container">
          <Sidebar />
          <div className="content">
            <Player
              aspectRatio="16:9"
              poster="/assets/poster.png"
              src={`/dakterras.mp4`}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default props => {
  return (
    <Context.Consumer>
      {context => <Video {...props} context={context} />}
    </Context.Consumer>
  )
}