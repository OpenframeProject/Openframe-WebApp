import { uniq, filter } from 'lodash';

import {
  FETCH_USER_ARTWORK_SUCCESS,
  LOGOUT_SUCCESS,
  CREATE_ARTWORK_SUCCESS,
  DELETE_ARTWORK_SUCCESS
} from '../../actions/const'

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_USER_ARTWORK_SUCCESS: {

      state[action.userId] = state[action.userId] || [];
      let ids = [
        ...state[action.userId],
        ...action.response.result
      ];
      return {
        ...state,
        [action.userId]: uniq(ids)
      };
    }
    case CREATE_ARTWORK_SUCCESS: {
      state[action.userId] = state[action.userId] || [];
      return {
        ...state,
        [action.userId]: [
          action.response.result,
          ...state[action.userId]
        ]
      };
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

// export default function(state = [], action) {
//   switch(action.type) {
//     case FETCH_USER_ARTWORK_SUCCESS: {
//       let ids = [
//         ...state,
//         ...action.response.result
//       ];
//       return uniq(ids);
//     }
//     case CREATE_ARTWORK_SUCCESS: {

//       let ids = [
//         action.response.result,
//         ...state
//       ];
//       return uniq(ids);
//     }
//     case DELETE_ARTWORK_SUCCESS: {
//       let ids = [
//         ...state
//       ];
//       let index = ids.indexOf(action.artwork.id);
//       if (index > -1) {
//           ids.splice(index, 1);
//       }
//       return ids;
//     }
//     case LOGOUT_SUCCESS:
//       return [];
//     default: {
//       /* Return original state if no actions were consumed. */
//       return state;
//     }
//   }
// }