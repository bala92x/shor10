import ReactDOM from 'react-dom';
import { Meteor } from "meteor/meteor";
import { Tracker } from 'meteor/tracker';

import { routes } from '../imports/routes/routes'
import { onAuthChange } from '../imports/utils/auth';
import { Links } from '../imports/api/links';

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
});

Tracker.autorun(async () => {
    const links = await Links.find({}).fetch();
    console.log(links);
});

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'));
});