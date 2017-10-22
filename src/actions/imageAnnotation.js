import * as actionTypes from '@actions/actionTypes';
import { NetworkManager, ContentTypes } from '@utils';


export function createImageAnnotation(content) {

   return (dispatch) => {
   		dispatch(createImgAnnotation())
    	saveImageAnnotation(content)
      		.then(() => {
        		dispatch(createImgAnnotationSuccess())
      		})
      		.catch((err) => {
      			console.log('err:', err)
      			dispatch(createImgAnnotationFailure())
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

export function createImgAnnotationFailure() {
  return {
    type: actionTypes.CREATING_IMG_ANNOTATION_FAILURE
  }
}

function saveImageAnnotation(imageAnnotation) {
console.log('wqewqew')
	return new Promise((resolve, reject) => {

		return resolve(NetworkManager.post('/annotations', 
      imageAnnotation.getObjectRepresentation(), 
      ContentTypes.jsonLD)
    );
    
	});
}