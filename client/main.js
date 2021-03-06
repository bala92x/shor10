import ReactDOM from 'react-dom';
import { Meteor } from "meteor/meteor";
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { routes } from '../imports/routes/routes'
import { onAuthChange } from '../imports/utils/auth';
import '../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
    Session.set('showVisible', true);
    ReactDOM.render(routes, document.getElementById('app'));
});