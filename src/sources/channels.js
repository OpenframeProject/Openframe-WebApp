import fetchJSON from './fetchJSON';

const modelPrefix = 'channels';

const channels = {
  /**
   * Fetch a list of channels.
   * @param  {Object} filter
   * @return {Promise}
   */
  fetch: function(filter = {}) {
    let defaultFilter = {
      include: ['owner']
    };
    let finalFilter = Object.assign({}, defaultFilter, filter);
    return fetchJSON(`${modelPrefix}`, { data: finalFilter });
  },

  /**
   * Fetch a single channel by ID
   * @param  {String}  channelId
   * @param  {Object} filter
   * @return {Promise}
   */
  fetchById: function(channelId, filter = {}) {
    let defaultFilter = {
      include: ['owner']
    };
    let finalFilter = Object.assign({}, defaultFilter, filter);
    return fetchJSON(`${modelPrefix}/${channelId}`, { data: finalFilter });
  }

};

export default channels;
