import * as actionTypes from '@actions/actionTypes';
import { NetworkManager, ContentTypes } from '@utils';

///
/// Create annotation
///

export function createAnnotation(annotation) {

   return (dispatch) => {
   		
   		dispatch(()=>{
		  	return {
    			type: actionTypes.CREATE_ANNOTATION
  			}
   		})
    	saveAnnotation(annotation)
      		.then(() => {
        		dispatch(createAnnotationSuccess())
      		})
      		.catch((err) => {
      			console.log('err:', err)
      			dispatch(createAnnotationFailure(err))
      		})
  	}
}



export function createAnnotationSuccess() {
  return {
    type: actionTypes.CREATE_ANNOTATION_SUCCESS,
  }
}

export function createAnnotationFailure(error) {
  return {
    type: actionTypes.CREATE_ANNOTATION_FAILURE,
    error
  }
}


function saveAnnotation(annotation) {

  return new Promise((resolve, reject) => {

	return resolve(NetworkManager.post('/annotations/', 
      annotation.getObjectRepresentation(), 
      ContentTypes.jsonLD)
    );
    
  });
}