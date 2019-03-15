import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

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
                this.setState({ error: error.message });
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Login to Shor10</h1>

                {this.state.error ? <p>{this.state.error}</p> : undefined}

                <form onSubmit={this.onSubmit}>
                    <input type="email" name="email" ref="email" placeholder="Email" />
                    <input type="password" name="password" ref="password" placeholder="Password" />
                    <button>Login</button>
                </form>

                <Link to="/signup">Join</Link>
            </div>
        );
    }
}