import * as actionTypes from '@actions/actionTypes';
import { NetworkManager, ContentTypes } from '@utils';


///
/// Create text annotation
///

export function createTextAnnotation(content) {

   return (dispatch) => {
   		dispatch(createTxtAnnotation())
    	saveTextAnnotation(content)
      		.then(() => {
        		dispatch(createTxtAnnotationSuccess())
      		})
      		.catch((err) => {
      			console.log('err:', err)
      			dispatch(createTxtAnnotationFailure(err))
      		})
  	}
}

export function createTxtAnnotation() {
  return {
    type: actionTypes.CREATING_TEXT_ANNOTATION
  }
}

export function createTxtAnnotationSuccess() {
  return {
    type: actionTypes.CREATING_TEXT_ANNOTATION_SUCCESS,
  }
}

export function createTxtAnnotationFailure(error) {
  return {
    type: actionTypes.CREATING_TEXT_ANNOTATION_FAILURE,
    error
  }
}

function saveTextAnnotation(textAnnotation) {

  textAnnotation.setProperty('created', Date.now());
  textAnnotation.setProperty('modified', Date.now());


	return new Promise((resolve, reject) => {

		return resolve(NetworkManager.post('/annotations/', 
      textAnnotation.getObjectRepresentation(), 
      ContentTypes.jsonLD)
    );
    
	});
}