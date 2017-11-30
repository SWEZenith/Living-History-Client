import * as actionTypes from '@actions/actionTypes';
import { NetworkManager, ContentTypes } from '@utils';

///
/// Fetch user contents

export function fetchUserContents(userId) {

   return (dispatch) => {
      dispatch(fetchUserContentsStart());
      getUserContents(userId)
          .then((userContents) => {
            dispatch(fetchUserContentsSuccess(userContents));
          })
          .catch((error) => {
            console.log('error:', error);
            dispatch(fetchUserContentsFailure(error));
          });
    };
}

export function fetchUserContentsStart() {
  return {
    type: actionTypes.FETCH_USER_CONTENTS
  };
}

export function fetchUserContentsSuccess(userContents) {
  return {
    type: actionTypes.FETCH_USER_CONTENTS_SUCCESS,
    userContents
  };
}

export function fetchUserContentsFailure(error) {
  return {
    type: actionTypes.FETCH_USER_CONTENTS_FAILURE,
    error
  };
}

function getUserContents(userId) {
  return new Promise((resolve) => {
    return resolve(NetworkManager.get(`/users/${userId}/contents`, ContentTypes.jsonLD));
  });
}
