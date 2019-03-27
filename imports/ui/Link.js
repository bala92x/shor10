import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';
import { onEnterPrivatePage } from '../utils/auth';

export default class Link extends React.Component {
    componentWillMount() {
        onEnterPrivatePage();
    }

    render() {
        return (
            <div>
                <PrivateHeader title="Your Links" />
                <LinksListFilters />
                <AddLink />
                <LinksList />
            </div>
        );
    }
}