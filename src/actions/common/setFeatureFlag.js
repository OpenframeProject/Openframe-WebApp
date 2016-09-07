import { SET_FEATURE_FLAG } from './../const';

module.exports = function(flag, value) {
  return {
    type: SET_FEATURE_FLAG,
    flag,
    value
  };
};
