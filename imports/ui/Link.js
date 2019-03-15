import React from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class Link extends React.Component {
    onLogout = () => {
        Accounts.logout();
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