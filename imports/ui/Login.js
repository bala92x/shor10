import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import { onEnterPublicPage } from '../utils/auth';

export default class Login extends React.Component {
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

        Meteor.loginWithPassword({ email }, password, (error) => {
            if (error) {
                this.setState({ error: 'Unable to login. Check email and password.' });
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
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Login to Shor10</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form onSubmit={this.onSubmit} noValidate className="boxed-view__form">
                        <input type="email" name="email" ref="email" placeholder="Email" autoComplete="true" />
                        <input type="password" name="password" ref="password" placeholder="Password" autoComplete="true" />
                        <button className="button">Login</button>
                    </form>

                    <Link to="/signup">Join</Link>
                </div>

            </div>
        );
    }
}