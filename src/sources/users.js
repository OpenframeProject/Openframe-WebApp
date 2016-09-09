import fetchJSON from './fetchJSON';

const modelPrefix = 'users';

const users = {

  /**
   * Create
   * @param  {Object} data
   * @return {Promise}
   */
  create: function(data) {
    return fetchJSON(`${modelPrefix}`, { method: 'POST', data: data });
  },


  /**
   * Login
   * @param  {Object} credentials {username, password}
   * @return {Promise}
   */
  login: function(credentials) {
    return fetchJSON(`${modelPrefix}/login`, { method: 'POST', data: credentials });
  },

  /**
   * Fetch a list of users.
   * @param  {Boolean}
   * @return {Promise}
   */
  fetch: function(filter = {}) {
    let defaultFilter = {};
    let finalFilter = Object.assign({}, defaultFilter, filter);
    return fetchJSON(`${modelPrefix}`, { data: finalFilter });
  },

  /**
   * Fetch a single user by ID
   * @param  {String}  userId defaults to 'current'
   * @return {Promise}
   */
  fetchById: function(userId = 'current', filter = {}) {
    let defaultFilter = {};
    let finalFilter = Object.assign({}, defaultFilter, filter);
    return fetchJSON(`${modelPrefix}/${userId}`, { data: finalFilter });
  },

  /**
   * Fetch a single user by username
   * @param  {String} username
   * @return {Promise}
   */
  fetchByUsername: function(username, filter = {}) {
    let defaultFilter = {
      where: {
        username: username
      },
      limit: 1
    };
    let finalFilter = Object.assign({}, defaultFilter, filter);
    return this.fetch(finalFilter);
  },

  searchByUsername: function(input) {
    let filter = {
      where: {
        username: {
          like: input
        }
      },
      limit: 10
    };
    return this.fetch(filter);
  },

  /**
   * Fetch a single user's owned artwork by user id
   *
   * // TODO - pagination
   *
   * @param  {String} userId
   * @return {Promise}
   */
  fetchUserArtwork: function(userId, filter = {}) {
    let defaultFilter = {
      limit: 100
    };
    let finalFilter = Object.assign({}, defaultFilter, filter);
    return fetchJSON(`${modelPrefix}/${userId}/created_artwork`, { data: finalFilter });
  },

  /**
   * Fetch a single user's liked artwork by user id
   *
   * // TODO - pagination
   *
   * @param  {String} userId
   * @return {Promise}
   */
  fetchUserLikedArtwork: function(userId = 'current', filter = {}) {
    let defaultFilter = {
      limit: 100
    };
    let finalFilter = Object.assign({}, defaultFilter, filter);
    return fetchJSON(`${modelPrefix}/${userId}/liked_artwork`, { data: finalFilter });
  },

  /**
   * Fetch a list of all owned and managed frames
   * @param  {String} userId
   * @return {Promise}
   */
  fetchAllFrames: function(userId = 'current') {
    return fetchJSON(`${modelPrefix}/${userId}/all_frames`);
  },

  /**
   * Fetch a collection
   * @param  {String} collectionId Collection id (optional, defaults to primary collection)
   */
  fetchCollection: function(userId = 'current', collectionId = 'primary') {
    let filter = {
      'filter': {
        'include': [
          'artwork'
        ]
      }
    };
    return fetchJSON(`${modelPrefix}/${userId}/collections/${collectionId}`, { data: filter });
  },

  /**
   * Update a user
   * @param  {String} userId
   * @param  {Object} userData
   * @return {Promise}
   */
  update: function(userId = 'current', userData) {
    return fetchJSON(`${modelPrefix}/${userId}`, { method: 'PUT', data: userData });
  },

  /**
   * Delete a userframe
   * @param  {String} userId
   * @return {Promise}
   */
  delete: function(userId) {
    return fetchJSON(`${modelPrefix}/${userId}`, { method: 'DELETE' });
  },

  likeArtwork: function(artworkId, userId = 'current') {
    return fetchJSON(`${modelPrefix}/${userId}/liked_artwork/rel/${artworkId}`, { method: 'PUT'});
  },

  unlikeArtwork: function(artworkId, userId = 'current') {
    return fetchJSON(`${modelPrefix}/${userId}/liked_artwork/rel/${artworkId}`, { method: 'DELETE'});
  }
};

export default users;
