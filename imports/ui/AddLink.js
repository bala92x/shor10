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
                <button onClick={this.handleModalOpen} className="button">
                    + Add Link
                </button>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="Add link"
                    appElement={document.getElementById('app')}
                    onAfterOpen={this.handleAfterModalOpen}
                    onRequestClose={this.handleModalClose}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                >
                    <h1>Shor10 Link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit} className="boxed-view__form">
                        <input
                            type="text"
                            placeholder="URL"
                            ref="url"
                            value={this.state.url}
                            onChange={this.onChange}
                        />
                        <button className="button">
                            Add Link
                        </button>
                        <button type="button" onClick={this.handleModalClose} className="button button--secondary">
                            Cancel
                        </button>
                    </form>
                </Modal>
            </div>
        );
    }
}
