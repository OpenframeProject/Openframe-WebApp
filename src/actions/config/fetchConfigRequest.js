import {FETCH_CONFIG_REQUEST} from './../const';
import fetchConfigSuccess from './fetchConfigSuccess';
import fetchConfigFailure from './fetchConfigFailure';
import {config} from '../../sources/api';

export default function() {
  return dispatch => {
    dispatch({
      type: FETCH_CONFIG_REQUEST
    });

    return config.fetch().then(
      response => dispatch(fetchConfigSuccess(response.config)),
      error => dispatch(fetchConfigFailure(error))
    );
  }
}
