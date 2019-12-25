import {PASSWORD_RESET_FAILURE} from './../const';

export default function(error) {
  return {
      type: PASSWORD_RESET_FAILURE,
      error
  }
};