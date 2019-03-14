import React from 'react';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
    render() {
        return (
            <div>
                <h1>Login to Shor10</h1>

                <Link to="/signup">Join</Link>
            </div>
        );
    }
}