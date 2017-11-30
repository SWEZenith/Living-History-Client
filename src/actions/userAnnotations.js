import * as actionTypes from '@actions/actionTypes';
import { NetworkManager, ContentTypes } from '@utils';

///
/// Fetch user annotations


export function fetchUserAnnotations(userId) {
   return (dispatch) => {
      dispatch(fetchUserAnnotationsStart());
      getUserAnnotations(userId)
          .then((userAnnotations) => {
            dispatch(fetchUserAnnotationsSuccess(userAnnotations));
          })
          .catch((error) => {
            console.log('error:', error);
            dispatch(fetchUserAnnotationsFailure(error));
          });
    };
}

export function fetchUserAnnotationsStart() {
  return {
    type: actionTypes.FETCH_USER_ANNOTATIONS
  };
}

export function fetchUserAnnotationsSuccess(userAnnotations) {
  return {
    type: actionTypes.FETCH_USER_ANNOTATIONS_SUCCESS,
    userAnnotations
  };
}

export function fetchUserAnnotationsFailure(error) {
  return {
    type: actionTypes.FETCH_USER_ANNOTATIONS_FAILURE,
    error
  };
}

function getUserAnnotations(userId) {
  return new Promise((resolve) => {
    return resolve(NetworkManager.get(`/users/${userId}/annotations`, ContentTypes.jsonLD));
  });
}
