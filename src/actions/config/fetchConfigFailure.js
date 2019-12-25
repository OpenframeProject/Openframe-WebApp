import {FETCH_CONFIG_FAILURE} from './../const';

export default function(parameter) {
  return { type: FETCH_CONFIG_FAILURE, parameter };
};
