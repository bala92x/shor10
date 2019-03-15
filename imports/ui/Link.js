import React from 'react';
import { Accounts } from 'meteor/accounts-base';

import { onEnterPrivatePage } from '../utils/auth';

export default class Link extends React.Component {
    onLogout = () => {
        Accounts.logout();
    }

    componentWillMount() {
        onEnterPrivatePage();
    }

    render() {
        return (
            <div>
                <h1>Links</h1>
    
                <button onClick={this.onLogout}>Logout</button>
            </div>
        );
    }
}