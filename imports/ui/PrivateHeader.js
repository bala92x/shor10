import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';

export default class PrivateHeader extends React.Component {
    onLogout = () => {
        Accounts.logout();
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <button onClick={this.onLogout}>Logout</button>
            </div>
        );
    }
}

PrivateHeader.PropTypes = {
    title: PropTypes.required
}