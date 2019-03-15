import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from "meteor/meteor";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { Tracker } from 'meteor/tracker';

import Login from '../imports/ui/Login';
import Signup from '../imports/ui/Signup';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound';

const history = createBrowserHistory();
const unauthanticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];
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

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    const pathname = history.location.pathname;
    const isUnauthanticatedPage = unauthanticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (isUnauthanticatedPage && isAuthenticated) {
        history.replace('/links');
    } else if (isAuthenticatedPage && !isAuthenticated) {
        history.replace('/')
    }
});

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'));
});