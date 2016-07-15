import {CREATE_ACCOUNT_REQUEST} from './../const';
import createAccountSuccess from './createAccountSuccess';
import createAccountFailure from './createAccountFailure';
import {users} from '../../sources/api';

module.exports = function(data) {
  return dispatch => {
    dispatch({
      type: CREATE_ACCOUNT_REQUEST
    });
    return users.create(data).then(
      response => {
        dispatch(createAccountSuccess(response, data.password));
      },
      error => dispatch(createAccountFailure(error))
    );
  };
};