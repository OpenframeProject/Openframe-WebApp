import {LOGIN_SUCCESS} from './../const';
import {setToken} from '../../services/auth';

module.exports = function(token) {
  // set accesToken on localStorage
  setToken(token.id);
  return {
  	type: LOGIN_SUCCESS,
  	token };
};
