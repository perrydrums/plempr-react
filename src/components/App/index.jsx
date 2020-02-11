import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const App = () => {
  return (
    <Router>
        <Route exact path={ROUTES.ROOT} component={null} />
    </Router>
  );
};

export default App;
