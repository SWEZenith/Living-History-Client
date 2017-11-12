import * as actionTypes from '@actions/actionTypes';

const initialState = {
  started:false,
  isSuccessfull: false,
  error: ''
}

export default function textAnnotationReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.CREATING_TEXT_ANNOTATION:
      return {
        ...state,
        started: true,
        actionType: actionTypes.CREATING_TEXT_ANNOTATION
      }
    case actionTypes.CREATING_TEXT_ANNOTATION_SUCCESS:
      return {
        ...state,
        started:false,
        isSuccessfull: true,
        actionType: actionTypes.CREATING_TEXT_ANNOTATION_SUCCESS
      }
    case actionTypes.CREATING_TEXT_ANNOTATION_FAILURE:
      return {
        ...state,
        started:false,
        error: action.error,
        actionType: actionTypes.CREATING_TEXT_ANNOTATION_FAILURE
      }
    default:
      return state
  }
}