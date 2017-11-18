import * as actionTypes from '@actions/actionTypes';
import { NetworkManager, ContentTypes, StorageHelper } from '@utils';
import * as constants from '@utils/constants';

///
/// Login
///

export function login(credentials) {

   return (dispatch) => {

   		dispatch(loginToSystem());
    	
      authenticate(credentials)
      		.then((tokens) => {

            StorageHelper.set(constants.REFRESH_TOKEN_KEY, tokens.refreshToken);
            StorageHelper.set(constants.AUTH_TOKEN_KEY, tokens.token);
            StorageHelper.set(constants.USERNAME, credentials.username);
            dispatch(loginToSystemSuccess(tokens));
            
      		})
          .catch((err) => {

      			console.log('err:', err)
      			dispatch(loginToSystemFailure(err))

      		})
  	}
}

export function loginToSystem() {
  return {
    type: actionTypes.LOGIN_TO_SYSTEM
  }
}

export function loginToSystemSuccess(tokens) {
  return {
    type: actionTypes.LOGIN_TO_SYSTEM_SUCCESS,
    tokens
  }
}

export function loginToSystemFailure(error) {
  return {
    type: actionTypes.LOGIN_TO_SYSTEM_FAILURE,
    error
  }
}

function authenticate(credentials) {

	return new Promise((resolve, reject) => {

		return resolve(NetworkManager.post('/auth/signin', credentials, ContentTypes.json));
    
	});
}