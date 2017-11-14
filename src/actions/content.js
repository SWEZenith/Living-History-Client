import * as actionTypes from '@actions/actionTypes';
import { NetworkManager, ContentTypes } from '@utils';

///
/// Fetch contents
///

export function fetchContents() {

   return (dispatch) => {
      dispatch(fetchContentsStart())
      getContents()
          .then((contents) => {
            dispatch(fetchContentsSuccess(contents))
          })
          .catch((error) => {
            console.log('error:', error)
            dispatch(fetchContentsFailure(error))
          })
    }
}

export function fetchContentsStart() {
  return {
    type: actionTypes.FETCH_CONTENTS
  }
}

export function fetchContentsSuccess(contents) {
  
  return {
    type: actionTypes.FETCH_CONTENTS_SUCCESS,
    contents
  }
}

export function fetchContentsFailure(error) {
  return {
    type: actionTypes.FETCH_CONTENTS_FAILURE,
    error
  }
}

function getContents() {

  return new Promise((resolve, reject) => {

    //return resolve(NetworkManager.get(`/annotations?contentId=${contentId}`, ContentTypes.jsonLD));
    return resolve(NetworkManager.get(`/contents/`, ContentTypes.jsonLD));
    
  });
}