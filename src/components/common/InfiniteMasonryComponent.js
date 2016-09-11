import React, {
  Component,
  PropTypes
} from 'react';

import Masonry from 'react-masonry-component';
import Waypoint from 'react-waypoint';
import Spinner from 'react-spin';

import config from 'config';

require('styles//common/InfiniteMasonry.scss');

const masonryOptions = {
    transitionDuration: '0.2s'
};

class InfiniteMasonryComponent extends Component {
  constructor() {
    super();
    this.page = 0;
    this.state = {
      isLoadingMore: false
    }
  }

  componentDidMount() {
      this.masonry.on('layoutComplete', ::this._handleLayoutComplete);
  }

  componentWillUnmount() {
      this.masonry.off('layoutComplete', ::this._handleLayoutComplete);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.hasMore) {
      this.setState({
        isLoadingMore: false
      });
    }
  }

  _handleLayoutComplete() {
    console.log('_handleLayoutComplete');
    this.isLayoutComplete = true;
  }

  _handleWaypointEnter(e) {
    console.log('_handleWaypointEnter', e, this.isLayoutComplete);
    if (!this.isLayoutComplete || !this.props.hasMore) {
      return;
    }
    this.page += 1;
    this.props.loadMore(this.page);
    this.isLayoutComplete = false;
    this.setState({
      isLoadingMore: true
    });
  }

  _handleWaypointLeave(e) {
    console.log('_handleWaypointLeave', e);
    this.setState({
      isLoadingMore: false
    });
  }

  render() {
    let loadingComponent = this.props.loadingComponent || <Spinner config={config.spinnerConfig} />;
    let endComponent = this.props.endComponent || null;
    return (
      <div className="infinite-masonry">
        <Masonry
          options={masonryOptions}
          ref={(c) => {
            if (c) this.masonry = c.masonry;
          }} >
            {this.props.children}
        </Masonry>
        <Waypoint
          onEnter={::this._handleWaypointEnter}
          onLeave={::this._handleWaypointLeave}
          scrollableAncestor={window}
        />
        <div className="infinite-masonry__loading">
          {
            this.state.isLoadingMore
            ? loadingComponent
            : null
          }
          {
            !this.props.hasMore
            ? endComponent
            : null
          }
        </div>
      </div>
    );
  }
}

InfiniteMasonryComponent.displayName = 'InfiniteMasonryComponent';

InfiniteMasonryComponent.propTypes = {
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool
};

InfiniteMasonryComponent.defaultProps = {
  initialLikedState: false
};

export default InfiniteMasonryComponent;
