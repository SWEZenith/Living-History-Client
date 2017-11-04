import * as actionTypes from '@actions/actionTypes';
import { NetworkManager, ContentTypes } from '@utils';


///
/// Create image annotation
///

export function createImageContent(content) {

   return (dispatch) => {
   		dispatch(createImgContent())
    	saveImageContent(content)
      		.then(() => {
        		dispatch(createImgcontentSuccess())
      		})
      		.catch((err) => {
      			console.log('err:', err)
      			dispatch(createImgContentFailure())
      		})
  	}
}

export function createImgContent() {
  return {
    type: actionTypes.CREATING_IMG_CONTENT
  }
}

export function createImgContentSuccess(content) {
  return {
    type: actionTypes.CREATING_IMG_CONTENT_SUCCESS,
    content
  }
}

export function createImgContentFailure() {
  return {
    type: actionTypes.CREATING_IMG_CONTENT_FAILURE
  }
}

function saveImageContent(content) {

	return new Promise((resolve, reject) => {

		return resolve(NetworkManager.post('/contents/', 
      content.getObjectRepresentation(), 
      ContentTypes.jsonLD)
    );
    
	});
}


///
/// Fetch content list
///

export function fetchContents(contentId) {

   return (dispatch) => {
      dispatch(fetchContentsStart())
      getContents(contentId)
          .then((content) => {
            dispatch(fetchContentsSuccess(contents))
          })
          .catch((err) => {
            console.log('err:', err)
            dispatch(fetchContentsFailure())
          })
    }
}

export function fetchContentsStart() {
  return {
    type: actionTypes.FETCH_CONTENTS
  }
}

export function fetchContentsSuccess(content) {
  return {
    type: actionTypes.FETCH_CONTENTS_SUCCESS,
    content
  }
}

export function fetchContentsFailure() {
  return {
    type: actionTypes.FETCH_CONTENTS_FAILURE
  }
}

function getContents(contentId) {

  return new Promise((resolve, reject) => {

    //return resolve(NetworkManager.get(`/annotations?contentId=${contentId}`, ContentTypes.jsonLD));
    return resolve(NetworkManager.get(`/content/`, ContentTypes.jsonLD));
    
  });
}