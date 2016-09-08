/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {
  SET_FEATURE_FLAG
} from '../actions/const'

import { getFlags, setFlags, setFlag } from '../services/feature-flags';

let featureFlags = getFlags();
let defaults = {
  channels: false,
  collections: false
};
const initialState = Object.assign({}, defaults, featureFlags);

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case SET_FEATURE_FLAG: {
      setFlag(action.flag, action.value);
      return {
        ...state,
        [action.flag]: action.value
      };
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
