'use strict';

import React from 'react';

require('styles/common/NotFound.scss');

class NotFoundComponent extends React.Component {
  render() {
    return (
      <div className="not-found">
        Sorry, that page doesn't exist!
      </div>
    );
  }
}

NotFoundComponent.displayName = 'NotFoundComponent';

// Uncomment properties you need
// NotFoundComponent.propTypes = {};
// NotFoundComponent.defaultProps = {};

export default NotFoundComponent;
