import * as actionTypes from '@actions/actionTypes';

const initialState = {
  started:false,
  isSuccessfull: false,
  error: ''
}

export default function AnnotationReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.CREATE_ANNOTATION:
      return {
        ...state,
        started: true,
        actionType: actionTypes.CREATE_ANNOTATION
      }
    case actionTypes.CREATE_ANNOTATION_SUCCESS:
      return {
        ...state,
        started:false,
        isSuccessfull: true,
        actionType: actionTypes.CREATE_ANNOTATION_SUCCESS
      }
    case actionTypes.CREATE_ANNOTATION_FAILURE:
      return {
        ...state,
        started:false,
        error: action.error,
        actionType: actionTypes.CREATE_ANNOTATION_FAILURE
      }
    default:
      return state
  }
}