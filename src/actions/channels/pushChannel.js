import {PUSH_CHANNEL} from './../const';

export default function(channel) {
  return { type: PUSH_CHANNEL, channel };
};
