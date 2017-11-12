import * as actionTypes from '@actions/actionTypes';
import { NetworkManager, ContentTypes } from '@utils';


///
/// Registration
///

export function register(formInfo) {

   return (dispatch) => {
   		dispatch(registerToSystem())
    	signUp(formInfo)
      		.then((response) => {
        		dispatch(registerToSystemSuccess(response))
      		})
      		.catch((error) => {
      			console.log('error:', error)
      			dispatch(registerToSystemFailure(error))
      		})
  	}
}

export function registerToSystem() {
  return {
    type: actionTypes.REGISTER_TO_SYSTEM
  }
}

export function registerToSystemSuccess(response) {
  return {
    type: actionTypes.REGISTER_TO_SYSTEM_SUCCESS
  }
}

export function registerToSystemFailure(error) {
  return {
    type: actionTypes.REGISTER_TO_SYSTEM_FAILURE,
    error
  }
}

function signUp(formInfo) {

	return new Promise((resolve, reject) => {

		return resolve(NetworkManager.post('/auth/signup', 
      formInfo, 
      ContentTypes.json)
    );
    
	});
}