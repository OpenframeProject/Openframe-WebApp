import {LOADING_IMAGES} from './../const';

module.exports = function(isLoading) {
  return { type: LOADING_IMAGES, isLoading };
};
