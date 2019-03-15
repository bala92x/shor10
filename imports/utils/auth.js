import { Meteor } from 'meteor/meteor';
import { createBrowserHistory } from 'history';

const unauthanticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

export const history = createBrowserHistory();

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

export const onAuthChange = (isAuthenticated) => {
    const pathname = history.location.pathname;
    const isUnauthanticatedPage = unauthanticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (isUnauthanticatedPage && isAuthenticated) {
        history.replace('/links');
    } else if (isAuthenticatedPage && !isAuthenticated) {
        history.replace('/')
    }
};