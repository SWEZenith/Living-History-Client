import * as actionTypes from '@actions/actionTypes';
import { NetworkManager, ContentTypes } from '@utils';


///
/// Create image annotation
///

export function createImageAnnotation(content) {

   return (dispatch) => {
   		dispatch(createImgAnnotation())
    	saveImageAnnotation(content)
      		.then(() => {
        		dispatch(createImgAnnotationSuccess())
      		})
      		.catch((error) => {
      			console.log('error:', error)
      			dispatch(createImgAnnotationFailure(error))
      		})
  	}
}

export function createImgAnnotation() {
  return {
    type: actionTypes.CREATING_IMG_ANNOTATION
  }
}

export function createImgAnnotationSuccess() {
  return {
    type: actionTypes.CREATING_IMG_ANNOTATION_SUCCESS
  }
}

export function createImgAnnotationFailure(error) {
  return {
    type: actionTypes.CREATING_IMG_ANNOTATION_FAILURE,
    error
  }
}

function saveImageAnnotation(imageAnnotation) {

	return new Promise((resolve, reject) => {

		return resolve(NetworkManager.post('/annotations/', 
      imageAnnotation.getObjectRepresentation(), 
      ContentTypes.jsonLD)
    );
    
	});
}


///
/// Fetch annotation list
///

export function fetchAnnotations(contentId) {

   return (dispatch) => {
      dispatch(fetchAnnotationsStart())
      getAnnotations(contentId)
          .then((annotations) => {
            dispatch(fetchAnnotationsSuccess(annotations))
          })
          .catch((error) => {
            console.log('error:', error)
            dispatch(fetchAnnotationsFailure(error))
          })
    }
}

export function fetchAnnotationsStart() {
  return {
    type: actionTypes.FETCH_ANNOTATIONS
  }
}

export function fetchAnnotationsSuccess(annotations) {
  
  return {
    type: actionTypes.FETCH_ANNOTATIONS_SUCCESS,
    annotations
  }
}

export function fetchAnnotationsFailure(error) {
  return {
    type: actionTypes.FETCH_ANNOTATIONS_FAILURE,
    error
  }
}

function getAnnotations(contentId) {

  return new Promise((resolve, reject) => {

    //return resolve(NetworkManager.get(`/annotations?contentId=${contentId}`, ContentTypes.jsonLD));
    return resolve(NetworkManager.get(`/annotations/`, ContentTypes.jsonLD));
    
  });
}