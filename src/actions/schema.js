import { Schema, arrayOf } from 'normalizr';

export const user = new Schema('user');
export const arrayOfUsers = arrayOf(user);

export const artwork = new Schema('artwork');
export const arrayOfArtworks = arrayOf(artwork);
artwork.define({
  owner: user
});

export const frame = new Schema('frames');
export const arrayOfFrames = arrayOf(frame);
frame.define({
  owner: user,
  _current_artwork: artwork
});

export const channel = new Schema('channel');
export const arrayOfChannels = arrayOf(channel);
channel.define({
  _current_artwork: artwork,
  // not currently implemented
  artworkHistory: artwork
});

export const collection = new Schema('collection');
export const arrayOfCollections = arrayOf(collection);
collection.define({
  artwork: arrayOf(artwork),
  owner: user
});