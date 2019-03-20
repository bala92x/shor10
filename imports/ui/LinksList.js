import React from 'react';
import { Tracker } from 'meteor/tracker';

import { Links } from '../api/links';

export default class LinksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        }
    }

    renderLinksListItems() {
        const linksListItems = this.state.links.map((link) => {
            return <p key={link._id}>{link.url}</p>
        });

        return linksListItems;
    }

    componentDidMount() {
        this.linkTracker = Tracker.autorun(async () => {
            const links = await Links.find({}).fetch();
            this.setState({ links });
        });
    }

    componentWillUnmount() {
        this.linkTracker.stop();
    }

    render () {
        return (
            <div>
                {this.renderLinksListItems()}
            </div>
        );
    }
}