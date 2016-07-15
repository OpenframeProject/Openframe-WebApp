import {CREATE_ACCOUNT_FAILURE} from './../const';

module.exports = function(error) {
  return {
    type: CREATE_ACCOUNT_FAILURE,
    error: error.message || error
  };
};
