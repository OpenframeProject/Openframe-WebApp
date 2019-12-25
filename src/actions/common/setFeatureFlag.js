import { SET_FEATURE_FLAG } from './../const';

export default function(flag, value) {
  return {
    type: SET_FEATURE_FLAG,
    flag,
    value
  };
};
