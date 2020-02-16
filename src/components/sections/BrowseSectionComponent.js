import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import StreamContainer from '../../containers/StreamContainer';
import CollectionsContainer from '../../containers/CollectionsContainer';
import ChannelsContainer from '../../containers/ChannelsContainer';
import ArtworkDetailContainer from '../../containers/ArtworkDetailContainer';
import CollectionDetailContainer from '../../containers/CollectionDetailContainer';


require('styles//sections/BrowseSection.scss');

class BrowseSectionComponent extends React.Component {
	render() {
		return (
			<div className="browse-section">
				{this.props.children}
				<Switch>
					<Route path="/stream" component={StreamContainer} />
					<Route path="/collections" component={CollectionsContainer} />
					<Route path="/channels" component={ChannelsContainer} />

					{/* <Route path="/artwork/:artworkId" component={ArtworkDetailContainer} /> */}
					{/* <Route path="/artwork/:artworkId" render={({match}) => <ArtworkDetailContainer params={match.params} />} /> */}
					<Route path="/collections/:collectionId" component={CollectionDetailContainer} />
					{/* <Redirect from="/" to="/stream" /> */}
				</Switch>
			</div>
		);
	}
}

BrowseSectionComponent.displayName = 'SectionsBrowseSectionComponent';

// Uncomment properties you need
// BrowseSectionComponent.propTypes = {};
// BrowseSectionComponent.defaultProps = {};

export default BrowseSectionComponent;
