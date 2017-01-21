import {FETCH_FRAMES_SUCCESS} from './../const';

import { normalize } from 'normalizr';
import * as schema from '../schema';
import { bindEventToAction } from '../../services/pubsub';
import frameUpdated from './frameUpdated';
import selectFrame from './selectFrame';
import updateNoticeBanner from '../ui/updateNoticeBanner';

module.exports = function(response) {
  return (dispatch, getState) => {
    let frames = response.frames;
    let normalized = normalize(frames, schema.arrayOfFrames);

    // if there isn't a frame selected, select the first
    const state = getState();
    const selectedFrameId = state.frames.selectedFrameId;
    if (!selectedFrameId && normalized.result.length > 0) {
      dispatch(selectFrame(normalized.result[0]));
    }
    // set up frame pubsub event subscriptions for each frame
    //
    // TODO: Potential race condition... make sure pubsub client is connected before FETCH_FRAMES_REQUEST?
    frames.forEach(function(frame) {
      _subscribeToFrameEvents(frame, dispatch);
    });
    dispatch({ type: FETCH_FRAMES_SUCCESS, response: normalized});

    if (frames.length === 0) {
      // no frames... update notice banner
      let notice = {
        message: '<h4>Welcome to Openframe!</h4><div>To start displaying artwork, <a href="http://openframe.io" target="_blank">set up a frame.</a></div>',
        type: 'info',
        dismissible: true
      };
      dispatch(updateNoticeBanner(notice));
    }
  }
};

function _subscribeToFrameEvents(frame, dispatch) {
  let frameId = frame.id;
  // bindEventToAction('/frame/' + frameId + '/connected', frameUpdated);

  // bindEventToAction('/frame/' + frameId + '/frame_updated', frameUpdated);
  bindEventToAction('/frame/' + frameId + '/db_updated', frameUpdated);

  // bindEventToAction('/frame/' + frameId + '/db_updated', function() {
  //   dispatch(fetchFramesRequest());
  // });

  // PubSub.subscribe('/frame/' + frameId + '/connected', function(data) {
  //     console.log('frame connected!', data);
  // });
  // PubSub.subscribe('/frame/' + frameId + '/disconnected', function(data) {
  //     console.log('frame disconnected!', data);
  // });
  // PubSub.subscribe('/frame/' + frameId + '/db_updated', function(data) {
  //     console.log('frame db_updated!', data);
  // });
  // PubSub.subscribe('/frame/' + frameId + '/updated', function(data) {
  //     console.log('frame updated!', data);
  // });
  // PubSub.subscribe('/frame/' + frameId + '/updating', function(data) {
  //     console.log('frame updating!', data);
  // });

}