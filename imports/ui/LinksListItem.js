import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';

export default class LinksListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            justCopied: false
        };
    }
    
    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);

        this.clipboard
            .on('success', () => {
                this.setState({ justCopied: true });
                setTimeout(() => {
                    this.setState({justCopied: false});
                }, 1000);
            })
            .on('error', () => {
                alert('Unable to copy. Please copy the link manually.');
            });
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    onHideClick = () => {
        Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
    }

    render() {
        return (
            <div>
                <p>{this.props.url}</p>
                <p>{this.props.shortUrl}</p>
                <p>{this.props.visible.toString()}</p>
                <button ref="copy" data-clipboard-text={this.props.shortUrl}>
                    { this.state.justCopied ? 'Copied' : 'Copy' }
                </button>
                <button onClick={this.onHideClick}>
                    { this.props.visible ? 'Hide' : 'Unhide' }
                </button>
            </div>
        );
    }
}

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired
}