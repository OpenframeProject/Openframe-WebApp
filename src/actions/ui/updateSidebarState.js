import {UPDATE_SIDEBAR_STATE} from './../const';

export default function(open) {
  return {
    type: UPDATE_SIDEBAR_STATE,
    open
  };
};
