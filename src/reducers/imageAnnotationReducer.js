import * as actionTypes from '@actions/actionTypes';

const initialState = {
  started:false,
  isSuccessfull: false,
  error: ''
}

export default function imageAnnotationReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.CREATING_IMG_ANNOTATION:
      return {
        ...state,
        started: true,
        actionType: actionTypes.CREATING_IMG_ANNOTATION
      }
    case actionTypes.CREATING_IMG_ANNOTATION_SUCCESS:
      return {
        ...state,
        started:false,
        isSuccessfull: true,
        actionType: actionTypes.CREATING_IMG_ANNOTATION_SUCCESS
      }
    case actionTypes.CREATING_IMG_ANNOTATION_FAILURE:
      return {
        ...state,
        started:false,
        isSuccessfull: false,
        error: action.error,
        actionType: actionTypes.CREATING_IMG_ANNOTATION_FAILURE
      }
    default:
      return state
  }
}