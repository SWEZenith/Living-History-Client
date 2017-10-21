import * as actionTypes from '@actions/actionTypes';
import { NetworkManager, ContentTypes } from '@utils';
import getPeople from '@utils/api';


export function createImageAnnotation() {
   return (dispatch) => {
   		dispatch(createImgAnnotation())
    	saveImageAnnotation()
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

function saveImageAnnotation(body){
console.log('vallsss : ', body)
	return new Promise((resolve, reject) => {

		return resolve(NetworkManager.post('/annotations', null, ContentTypes.jsonLD));
	});
}