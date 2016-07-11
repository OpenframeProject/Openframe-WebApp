/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import YouSectionComponent from 'components/sections/YouSectionComponent.js';

describe('YouSectionComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(YouSectionComponent);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('yousection-component');
  });
});
