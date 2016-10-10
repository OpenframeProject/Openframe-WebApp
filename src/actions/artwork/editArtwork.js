import { EDIT_ARTWORK } from './../const';
import updateVisibleModal from './../ui/updateVisibleModal';

module.exports = function(artworkId) {
  return dispatch => {
    dispatch({
      type: EDIT_ARTWORK, artworkId
    });

    dispatch(updateVisibleModal('edit-artwork'));
  };
};
