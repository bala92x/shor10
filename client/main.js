import ReactDOM from 'react-dom';
import { Meteor } from "meteor/meteor";
import { Tracker } from 'meteor/tracker';

import { routes } from '../imports/routes/routes'
import { onAuthChange } from '../imports/utils/auth';

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'));
});