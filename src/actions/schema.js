import { Schema, arrayOf } from 'normalizr';

export const frame = new Schema('frames');
export const arrayOfFrames = arrayOf(frame);

export const artwork = new Schema('artwork');
export const arrayOfArtwork = arrayOf(artwork);