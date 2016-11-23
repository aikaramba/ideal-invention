import React from 'react';
import {Route, Router, IndexRoute, hashHistory, browserHistory} from 'react-router';

import TodoApp from 'TodoApp';
import Login from 'Login';
import firebase from 'app/firebase/';

let requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/');
  }
  next();
};
let redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/todos');
  }
  next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
      <Route path = "todos" component={TodoApp} onEnter={requireLogin}/>
    </Route>
  </Router>
);