import { schema } from 'normalizr';

export const user = new schema.Entity('user');

export const artwork = new schema.Entity('artwork');
artwork.define({
  owner: user
});

export const frame = new schema.Entity('frame');
frame.define({
  owner: user,
  managers: [user],
  current_artwork: artwork
});

export const channel = new schema.Entity('channel');
channel.define({
  current_artwork: artwork,
  // not currently implemented
  artworkHistory: artwork
});

export const collection = new schema.Entity('collection');
collection.define({
  artwork: [artwork],
  owner: user
});