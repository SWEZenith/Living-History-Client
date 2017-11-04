import * as actionTypes from '@actions/actionTypes';
import { NetworkManager, ContentTypes, StorageHelper } from '@utils';
import * as constants from '@utils/constants';

export function createImageContent(contentFields) {

    console.log('ImageContentFields', contentFields);

   return (dispatch) => {

      dispatch(createContent());
      
      sendContent(contentFields)
          .then(() => {

            dispatch(createContentSuccess());
            
          })
          .catch((err) => {

            console.log('err:', err)
            dispatch(createContentFailure(err))

          })
    }
}

export function createContent() {
  return {
    type: actionTypes.CREATE_IMAGE_CONTENT
  }
}

export function createContentSuccess() {
  return {
    type: actionTypes.CREATE_IMAGE_CONTENT_SUCCESS,
  }
}

export function createContentFailure(error) {
  return {
    type: actionTypes.CREATE_IMAGE_CONTENT_FAILURE,
    error
  }
}

function sendContent(contentFields) {

  return new Promise((resolve, reject) => {

    return resolve(NetworkManager.post('/contents', contentFields, ContentTypes.json));
    
  });
}