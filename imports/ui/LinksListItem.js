import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

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

    onDeleteClick = () => {
        if (window.confirm("Are you sure you want to delete this link? It is irreversible, and anyone trying to access this URL in the future will receive an error.")) {
            Meteor.call('links.delete', this.props._id);
        }
    }

    renderStats = () => {
        const visitMessage = `${this.props.visitedCount} visit${this.props.visitedCount === 1 ? '' : 's'}`
        let lastVisitMessage = null;

        if (typeof this.props.lastVisitedAt === 'number') {
            lastVisitMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`;
        }

        return (
            <p className="item__message">
                {visitMessage} {lastVisitMessage}
            </p>
        );
    }

    render() {
        return (
            <div className="item">
                <h2>{this.props.url}</h2>
                <p className="item__message">{this.props.shortUrl}</p>
                {this.renderStats()}
                <a href={this.props.shortUrl} target="_blank" className="button button--pill button--link">
                    Visit
                </a>
                <button ref="copy" data-clipboard-text={this.props.shortUrl} className="button button--pill">
                    { this.state.justCopied ? 'Copied' : 'Copy' }
                </button>
                <button onClick={this.onHideClick} className="button button--pill">
                    { this.props.visible ? 'Hide' : 'Unhide' }
                </button>
                <button onClick={this.onDeleteClick} className="button button--pill button--warning">
                    Delete
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
    visible: PropTypes.bool.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number
}