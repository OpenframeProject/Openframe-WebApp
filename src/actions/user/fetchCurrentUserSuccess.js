import {FETCH_CURRENT_USER_SUCCESS} from './../const';
import { normalize } from 'normalizr';
import * as schema from '../schema';
import fetchFramesRequest from '../frame/fetchFramesRequest';
import fetchUserLikesRequest from './fetchUserLikesRequest';

export default function(response) {

  return dispatch => {
    dispatch({
      type: FETCH_CURRENT_USER_SUCCESS,
      response: normalize(response, schema.user)
    });
    dispatch(fetchFramesRequest());
    dispatch(fetchUserLikesRequest(response.id));
  }
};

function _subscribeToUserEvents(userId) {
  client.subscribe(`/user/${userId}/frame/new`, function(data) {
      console.log('new frame added!', data);
      // immediately add frame and make it current
      OF.DOM.updateFrames(data);
      // setup subscriptions
      OF.Frames.setupFrameSubscriptions(data);
  });
}