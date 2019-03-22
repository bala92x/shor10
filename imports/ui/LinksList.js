import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

import { Links } from '../api/links';
import LinkListItem from './LinksListItem';

export default class LinksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        }
    }

    componentDidMount() {
        this.linkTracker = Tracker.autorun(async () => {
            Meteor.subscribe('links');
            const links = await Links.find({}).fetch();
            this.setState({ links });
        });
    }

    componentWillUnmount() {
        this.linkTracker.stop();
    }

    renderLinksListItems() {
        const linksListItems = this.state.links.map((link) => {
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinkListItem key={link._id} shortUrl={shortUrl} {...link} />;
        });

        return linksListItems;
    }

    render () {
        return (
            <div>
                {this.renderLinksListItems()}
            </div>
        );
    }
}