/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {
  FETCH_FRAMES_REQUEST,
  FETCH_FRAMES_SUCCESS,
  FETCH_FRAMES_FAILURE,
  SELECT_FRAME
} from '../actions/const'

// pull selected frame id from localStorage, if present
let _selectedFrameId = null;
try {
    _selectedFrameId = localStorage.getItem('selectedFrameId');
} catch(e) {
}

const initialState = {
  isFetching: false,
  items: [],
  selectedFrameId: _selectedFrameId
};

/**
 * Selector which returns the selected frame model
 * @param  {Array} frames
 * @param  {String} selectedFrameId
 * @return {Object}
 */
export const getSelectedFrame = function(frames, selectedFrameId) {
  let selectedFrame = null;
  if (frames && frames.length && selectedFrameId) {
    selectedFrame = frames.find(f => f.id.toString() === selectedFrameId.toString());
  }
  return selectedFrame;
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_FRAMES_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_FRAMES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.frames
      };
    case FETCH_FRAMES_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case SELECT_FRAME:
      return {
        ...state,
        selectedFrameId: action.frameId
      };
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
