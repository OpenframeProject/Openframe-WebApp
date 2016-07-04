import fetchJSON from './fetchJSON';

const modelPrefix = 'collections';

const collections = {
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
   * Fetch a single collection by ID
   * @param  {String}  collectionId
   * @param  {Object} filter
   * @return {Promise}
   */
  fetchById: function(collectionId, filter = {}) {
    let defaultFilter = {};
    let finalFilter = Object.assign({}, defaultFilter, filter);
    return fetchJSON(`${modelPrefix}/${collectionId}`, { data: finalFilter });
  }

};

export default collections;
