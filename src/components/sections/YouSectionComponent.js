'use strict';

import React from 'react';

class YouSectionComponent extends React.Component {
  render() {
    return (
      <div className="you-section">
        {this.props.children}
      </div>
    );
  }
}

YouSectionComponent.displayName = 'SectionsYouSectionComponent';

// Uncomment properties you need
// YouSectionComponent.propTypes = {};
// YouSectionComponent.defaultProps = {};

export default YouSectionComponent;
