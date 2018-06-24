import React from 'react';

import {  Route, Switch} from 'react-router-dom';

// Components
import Home from './Home';
import Login from './Login';
import Register from './Register';
import NotFound from './NotFound';
import Logout from './Logout';
import Account from './Account';
import Video from './Video';
import Upload from './Upload';

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/logout" component={Logout} />
    <Route exact path="/account" component={Account} />
    <Route exact path="/video/:videoId" component={Video} />
    <Route exact path="/upload" component={Upload} />
    <Route component={NotFound} />
  </Switch>
);