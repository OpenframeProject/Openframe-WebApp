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
    let defaultFilter = {
      'fields': {
        email: true,
        website: true,
        twitter: true
      }
    };
    let finalFilter = Object.assign({}, defaultFilter, filter);
    return fetchJSON(`${modelPrefix}`, { data: finalFilter });
  },

  /**
   * Fetch a single user by ID
   * @param  {String}  userId defaults to 'current'
   * @param  {Boolean} includeCollections
   * @return {Promise}
   */
  fetchById: function(userId = 'current', filter = {}) {
    let defaultFilter = {
      'fields': {
        email: true,
        website: true,
        twitter: true
      }
    };
    let finalFilter = Object.assign({}, defaultFilter, filter);
    return fetchJSON(`${modelPrefix}/${userId}`, { data: finalFilter });
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
  update: function(userId, userData) {
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
    return fetchJSON(`${modelPrefix}/${userId}/artwork/like/${artworkId}`, { method: 'PUT'});
  },

  unlikeArtwork: function(artworkId, userId = 'current') {
    return fetchJSON(`${modelPrefix}/${userId}/artwork/unlike/${artworkId}`, { method: 'PUT'});
  }
};

export default users;
