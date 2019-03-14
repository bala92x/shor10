import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from "meteor/meteor";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';

import Login from '../imports/ui/Login';
import Signup from '../imports/ui/Signup';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound';

const history = createBrowserHistory();
const routes = (
    <Router history={history}>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/links" component={Link} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'));
});