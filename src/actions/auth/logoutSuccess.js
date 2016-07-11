import {LOGOUT_SUCCESS} from './../const';
import { browserHistory } from 'react-router'

module.exports = function() {
  browserHistory.push('/');
  return {
    type: LOGOUT_SUCCESS
  };
};
