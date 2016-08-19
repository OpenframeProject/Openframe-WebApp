import {FETCH_FRAMES_SUCCESS} from './../const';

import { normalize } from 'normalizr';
import * as schema from '../schema';
import { bindEventToAction } from '../../services/pubsub';
import frameUpdated from '../frame/frameUpdated';

module.exports = function(response) {
  let frames = response.frames;

  // set up frame pubsub event subscriptions for each frame
  //
  // TODO: Potential race condition... make sure pubsub client is connected before FETCH_FRAMES_REQUEST?
  frames.forEach(_subscribeToFrameEvents);
  return { type: FETCH_FRAMES_SUCCESS, response: normalize(frames, schema.arrayOfFrames) };
};

function _subscribeToFrameEvents(frame) {
  let frameId = frame.id;
  // bindEventToAction('/frame/' + frameId + '/connected', frameUpdated);
  bindEventToAction('/frame/' + frameId + '/db_updated', frameUpdated);

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