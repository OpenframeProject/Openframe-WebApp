import {UPDATE_USER_FAILURE} from './../const';

export default function(error) {
  return {
    type: UPDATE_USER_FAILURE,
    error: error.message || error
  };
};
