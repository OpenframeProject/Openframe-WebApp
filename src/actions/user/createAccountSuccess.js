import {CREATE_ACCOUNT_SUCCESS} from './../const';
// import loginRequest from '../auth/loginRequest';

module.exports = function(user, password) {
  return dispatch => {
    dispatch({
      type: CREATE_ACCOUNT_SUCCESS,
      notice: 'Thanks! You should receive a verification email shortly.',
      user
    });

    // let username = user.username;
    // user successfully created, login
    // dispatch(loginRequest({
    //   username,
    //   password
    // }));
  };
};