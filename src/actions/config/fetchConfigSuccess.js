import {FETCH_CONFIG_SUCCESS} from './../const';

import PubSub from '../../services/pubsub';

module.exports = function(config) {
  return dispatch => {

    PubSub.connect(config.pubsub_url);

    dispatch({ type: FETCH_CONFIG_SUCCESS, config });

  }
};
