import { EDIT_ARTWORK } from './../const';
import updateVisibleModal from './../ui/updateVisibleModal';

export default function(artworkId) {
  return dispatch => {
    dispatch({
      type: EDIT_ARTWORK, artworkId
    });

    dispatch(updateVisibleModal('edit-artwork'));
  };
};
