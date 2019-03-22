import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';

export default class LinksListItem extends React.Component {
    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);

        this.clipboard
            .on('success', () => {
                //this.refs.copy.text = 'Copied';
            })
            .on('error', () => {
                alert('Unable to copy. Please copy the link manually.');
            });
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    render() {
        return (
            <div>
                <p>{this.props.url}</p>
                <p>{this.props.shortUrl}</p>
                <button ref="copy" data-clipboard-text={this.props.shortUrl}>Copy</button>
            </div>
        );
    }
}

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
}