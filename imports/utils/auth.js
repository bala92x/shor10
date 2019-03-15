import { Meteor } from 'meteor/meteor';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const onEnterPublicPage = () => {
    if (Meteor.userId()) {
        history.replace('/links');
    }
};

export const onEnterPrivatePage = () => {
    if (!Meteor.userId()) {
        history.replace('/');
    }
};