import {CREATE_ACCOUNT_SUCCESS} from './../const';
// import loginRequest from '../auth/loginRequest';

module.exports = function(user, password) {
  return dispatch => {
    dispatch({
      type: CREATE_ACCOUNT_SUCCESS,
      notice: 'On it! A verification email has been sent to the address you provided. Please follow the link in the email to complete setting up your account.',
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