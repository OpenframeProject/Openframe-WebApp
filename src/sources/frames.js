import fetchJSON from './fetchJSON';

const modelPrefix = 'frames';

const frames = {
  /**
   * Fetch a list of frames.
   * @param  {Boolean}
   * @return {Promise}
   */
  fetch: function(filter = {}) {
    let defaultFilter = {};
    let finalFilter = Object.assign({}, defaultFilter, filter);
    return fetchJSON(`${modelPrefix}`, { data: finalFilter });
  },

  /**
   * Fetch a single frame by ID
   * @param  {String}  frameId defaults to 'current'
   * @param  {Boolean} includeCollections
   * @return {Promise}
   */
  fetchById: function(frameId, filter = {}) {
    let defaultFilter = {};
    let finalFilter = Object.assign({}, defaultFilter, filter);
    return fetchJSON(`${modelPrefix}/${frameId}`, { data: finalFilter });
  },

  /**
   * Update a frame
   * @param  {String} frameId
   * @param  {Object} frameData
   * @return {Promise}
   */
  update: function(frameId, frameData) {
    return fetchJSON(`${modelPrefix}/${frameId}`, { method: 'PUT', data: frameData });
  },

  /**
   * Update the current artwork on a frame; effectively, push an artwork to a frame.
   * @param  {String} frameId
   * @param  {Object} artworkData An artwork description object
   * @return {Promise}
   */
  updateCurrentArtwork: function(frameId, artworkData) {
    return fetchJSON(`${modelPrefix}/${frameId}/current_artwork`, { method: 'PUT', data: artworkData });
  },

  /**
   * Update list of managers by username
   * @param  {String} frameId
   * @param  {String} managersData
   * @return {Promise}
   */
  updateFrameManagers: function (frameId, managersData) {
    return fetchJSON(`${modelPrefix}/${frameId}/managers/by_username`, { method: 'PUT', data: managersData });
  },

  /**
   * Delete a frame
   * @param  {String} frameId
   * @return {Promise}
   */
  delete: function(frameId) {
    return fetchJSON(`${modelPrefix}/${frameId}`, { method: 'DELETE' });
  }


};

export default frames;
