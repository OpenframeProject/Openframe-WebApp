import {PUSH_CHANNEL} from './../const';

module.exports = function(channel) {
  return { type: PUSH_CHANNEL, channel };
};
