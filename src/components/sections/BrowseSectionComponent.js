'use strict';

import React from 'react';

require('styles//sections/BrowseSection.scss');

class BrowseSectionComponent extends React.Component {
  render() {
    return (
      <div className="browse-section">
        {this.props.children}
      </div>
    );
  }
}

BrowseSectionComponent.displayName = 'SectionsBrowseSectionComponent';

// Uncomment properties you need
// BrowseSectionComponent.propTypes = {};
// BrowseSectionComponent.defaultProps = {};

export default BrowseSectionComponent;
