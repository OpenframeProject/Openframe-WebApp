import {LOGIN_FAILURE} from './../const';

export default function(error) {
  return {
    type: LOGIN_FAILURE,
    error: error.message || error
  };
};
