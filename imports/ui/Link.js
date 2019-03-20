import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import LinksList from './LinksList';
import { onEnterPrivatePage } from '../utils/auth';

export default class Link extends React.Component {
    onLogout = () => {
        Accounts.logout();
    }

    onSubmit = (e) => {
        e.preventDefault();

        const url = this.refs.url.value.trim();

        if (url) {
            Meteor.call('links.insert', url);
            this.refs.url.value = '';
        }
    }

    componentWillMount() {
        onEnterPrivatePage();
    }

    render() {
        return (
            <div>
                <h1>Links</h1>
    
                <button onClick={this.onLogout}>Logout</button>
                <LinksList/>
                <p>Add Link</p>
                <form onSubmit={this.onSubmit}>
                    <input type="text" ref="url" placeholder="URL" />
                    <button>Add Link</button>
                </form>
            </div>
        );
    }
}