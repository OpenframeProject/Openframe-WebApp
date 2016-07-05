import {FETCH_CHANNELS_REQUEST} from './../const';
import fetchChannelsSuccess from './fetchChannelsSuccess';
import fetchChannelsFailure from './fetchChannelsFailure';
import {channels} from '../../sources/api';

module.exports = function() {
  return dispatch => {
    dispatch({
      type: FETCH_CHANNELS_REQUEST
    });
    return channels.fetch().then(
      response => dispatch(fetchChannelsSuccess(response)),
      error => dispatch(fetchChannelsFailure(error))
    );
  };
};