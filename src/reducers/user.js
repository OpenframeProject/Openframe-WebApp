/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);

  switch(action.type) {

    case 'LOGIN_REQUEST':
      // Modify next state depending on the action and return it
      return Object.assign({}, state, {
        isFetching: true
      });

    case 'LOGIN_SUCCESS':
      // Modify next state depending on the action and return it
      return Object.assign({}, state, {
        isFetching: false,
        lastUpdated: Date.now(),
        accessToken: action.accessToken
      });

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
