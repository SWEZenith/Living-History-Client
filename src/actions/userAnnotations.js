import * as actionTypes from '@actions/actionTypes';
import { NetworkManager, ContentTypes } from '@utils';
import * as constants from '@utils/constants';
import { StorageHelper } from '@utils';
///
/// Fetch user annotations


export function fetchUserAnnotations() {
   return (dispatch) => {
      dispatch(fetchUserAnnotationsStart());
      getUserAnnotations()
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

function getUserAnnotations() {
  return new Promise((resolve) => {
    return resolve(NetworkManager.get(`/users/${StorageHelper.get(constants.USERNAME)}/annotations`, ContentTypes.jsonLD));
  });
}
