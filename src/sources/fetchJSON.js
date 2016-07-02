import fetch from 'isomorphic-fetch';
import config from 'config';
import {getToken} from '../services/auth';

/**
 * Prepend the api base to url path via config
 * @param  {String} url
 * @return {String}
 */
function prependApiBase(url) {
  return `${config.apiBase}${url}`;
}

/**
 * If there is an access token present, append it to the url as
 * a query param.
 * @param  {String} url
 * @return {String}
 */
function appendAccessToken(url) {
  let token = getToken();
  return token ? `${url}?access_token=${token}` : url;
}

/**
 * Check for error or success status, throw error on error status
 * @param  {Object} response
 * @return {Object}
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 400) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

/**
 * Return the json response body as JS object
 * @param  {Object} response Raw fetch response object
 * @return {Object} JSON body as JS object
 */
function parseJSON(response) {
  return response.json()
}

/**
 * Light wrapper on fetch for JSON
 * @param  {String} url
 * @param  {String} options.method
 * @param  {Object} options.data
 * @return {Promise}
 */
export default function(url, { method = 'GET', data = {} } = {}) {
  return new Promise((resolve, reject) => {
    url = prependApiBase(url);
    url = appendAccessToken(url);
    fetch(url, {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
}