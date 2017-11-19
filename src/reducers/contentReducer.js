import * as actionTypes from '@actions/actionTypes';

const initialState = {
  saving:false,
  error: '',
  actionType: ''
}

export default function ContentReducer (state = initialState, action) {
  switch (action.type) {

    case actionTypes.CREATE_CONTENT:
      return {
        ...state,
        saving: true,
        actionType: actionTypes.CREATE_CONTENT
      }

    case actionTypes.CREATE_CONTENT_SUCCESS:
      return {
        ...state,
        error: '',
        saving: false,
        actionType: actionTypes.CREATE_CONTENT_SUCCESS
      }

    case actionTypes.CREATE_CONTENT_FAILURE:
      return {
        ...state,
        error: action.error,
        saving: false,
        actionType: actionTypes.CREATE_CONTENT_FAILURE
      }

    default:
      return state;
  }
}