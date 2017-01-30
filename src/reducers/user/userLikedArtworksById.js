import { uniq, filter } from 'lodash';

import {
  FETCH_USER_LIKES_SUCCESS,
  LIKE_ARTWORK_REQUEST,
  UNLIKE_ARTWORK_REQUEST,
  DELETE_ARTWORK_SUCCESS,
  LOGOUT_SUCCESS
} from '../../actions/const'

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_USER_LIKES_SUCCESS:
      state[action.userId] = state[action.userId] || [];
      let ids = [
        ...state[action.userId],
        ...action.response.result
      ];
      return {
        ...state,
        [action.userId]: uniq(ids)
      };
    case LIKE_ARTWORK_REQUEST: {
      let ids = [
        ...state[action.userId],
        action.artworkId
      ];
      return {
        ...state,
        [action.userId]: uniq(ids)
      }
    }
    case UNLIKE_ARTWORK_REQUEST: {
      let ids = filter(state[action.userId], (n) => {
        return n !== action.artworkId
      });
      return {
        ...state,
        [action.userId]: uniq(ids)
      }
    }
    case DELETE_ARTWORK_SUCCESS: {
      let ids = filter(state[action.artwork.ownerId], (n) => {
        return n !== action.artwork.id
      });
      return {
        ...state,
        [action.artwork.ownerId]: uniq(ids)
      }
    }
    case LOGOUT_SUCCESS:
      return {};
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}