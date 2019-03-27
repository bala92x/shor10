import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

import routes from '../routes/routes'

export default class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            isOpen: false,
            error: ''
        };
    }

    onChange = (e) => {
        this.setState({
            url: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { url } = this.state;

        Meteor.call('links.insert', url, (err, res) => {
            if (!err) {
                this.handleModalClose();
            } else {
                this.setState({
                    error: err.reason
                })
            }
        });
    }

    handleModalOpen = () => {
        this.setState({
            isOpen: true
        });
    }

    handleAfterModalOpen = () => {
        this.refs.url.focus();
    }

    handleModalClose = () => {
        this.setState({
            url: '',
            isOpen: false,
            error: ''
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleModalOpen}>
                    + Add Link
                </button>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="Add link"
                    appElement={document.getElementById('app')}
                    onAfterOpen={this.handleAfterModalOpen}
                    onRequestClose={this.handleModalClose}
                >
                    <h1>Add Link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            placeholder="URL"
                            ref="url"
                            value={this.state.url}
                            onChange={this.onChange}
                        />
                        <button>Add Link</button>
                    </form>
                    <button onClick={this.handleModalClose}>
                        Cancel
                    </button>
                </Modal>
            </div>
        );
    }
}
