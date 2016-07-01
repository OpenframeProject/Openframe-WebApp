/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import TabNavBarComponent from 'components//TabNavBarComponent.js';

describe('TabNavBarComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(TabNavBarComponent);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('tabnavbar-component');
  });
});
