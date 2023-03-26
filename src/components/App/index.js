import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import ChatPage from '../Chat';
import { withAuthentication } from '../Session';

function App() {
  return (
    <Router>
      <Route exact path={ROUTES.ROOT} component={SignInPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.CHAT} component={ChatPage} />
    </Router>
  );
}

export default withAuthentication(App);
