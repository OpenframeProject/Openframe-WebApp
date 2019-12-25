import {CREATE_ACCOUNT_FAILURE} from './../const';

export default function(error) {
  return {
    type: CREATE_ACCOUNT_FAILURE,
    error: error.message || error
  };
};
