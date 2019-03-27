import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

import routes from '../routes/routes'

export default class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            isOpen: false
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

        if (url) {
            Meteor.call('links.insert', url, (err, res) => {
                if (!err) {
                    this.setState({
                        url: '',
                        isOpen: false
                    });
                }
            });
        }
    }

    handleModalOpen = () => {
        this.setState({
            isOpen: true
        });
    }

    handleCloseModal = () => {
        this.setState({
            url: '',
            isOpen: false
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
                >
                    <p>Add Link</p>
                    <form onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            placeholder="URL"
                            value={this.state.url}
                            onChange={this.onChange}
                        />
                        <button>Add Link</button>
                    </form>
                    <button onClick={this.handleCloseModal}>
                        Cancel
                    </button>
                </Modal>
            </div>
        );
    }
}
