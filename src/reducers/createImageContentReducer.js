import * as actionTypes from '@actions/actionTypes';

const initialState = {
  saving:false,
  error: '',
  actionType: ''
}

export default function CreateImageContent (state = initialState, action) {
  switch (action.type) {

    case actionTypes.CREATE_IMAGE_CONTENT:
      return {
        ...state,
        saving: true,
        actionType: actionTypes.CREATE_IMAGE_CONTENT
      }

    case actionTypes.CREATE_IMAGE_CONTENT_SUCCESS:
      return {
        ...state,
        error: '',
        saving: false,
        actionType: actionTypes.CREATE_IMAGE_CONTENT_SUCCESS
      }

    case actionTypes.CREATE_IMAGE_CONTENT_FAILURE:
      return {
        ...state,
        error: action.error,
        saving: false,
        actionType: actionTypes.CREATE_IMAGE_CONTENT_FAILURE
      }

    default:
      return state;
  }
}