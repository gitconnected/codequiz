import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarComponent from './components/Navbar';
import Homepage from './views/Homepage';
import Javascript from './views/Javascript';
import JsExercise from './views/JsExercise';

import '../styles/prism.css';
import '../styles/app.css';

const App = () => {
  return (
    <Router>
      <NavbarComponent />
      <Switch>
        <Route exact path="/javascript">
          <Javascript />
        </Route>
        <Route path="/javascript/:exercise" component={JsExercise} />
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
};

render(<App />, document.getElementById('app'));
