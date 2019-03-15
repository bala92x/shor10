import React from 'react';
import { Router, Route, Switch } from "react-router-dom";

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import { history } from '../utils/auth';

export const routes = (
    <Router history={history}>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/links" component={Link} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);