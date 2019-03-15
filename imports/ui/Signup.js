import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

import { onEnterPublicPage } from '../utils/auth';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }

    onSubmit = (e) => {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        if (password.length < 9) {
            return this.setState({ error: 'Password must be more than 8 characters long.' });
        }

        Accounts.createUser({ email, password }, (error) => {
            if (error) {
                this.setState({ error: error.reason });
            } else {
                this.setState({ error: '' });
            }
        });
    }

    componentWillMount() {
        onEnterPublicPage();
    }

    render() {
        return (
            <div>
                <h1>Join to Shor10</h1>

                {this.state.error ? <p>{this.state.error}</p> : undefined}

                <form onSubmit={this.onSubmit} noValidate>
                    <input type="email" name="email" ref="email" placeholder="Email" />
                    <input type="password" name="password" ref="password" placeholder="Password" />
                    <button>Create Account</button>
                </form>

                <Link to="/">Already have an account?</Link>
            </div>
        );
    }
}