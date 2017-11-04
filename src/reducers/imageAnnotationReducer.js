import * as actionTypes from '@actions/actionTypes';

const initialState = {
  started:false,
  error: false
}

export default function imageAnnotationReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.CREATING_IMG_ANNOTATION:
      return {
        ...state,
        started: true,
        error: false,
        actionType: actionTypes.CREATING_IMG_ANNOTATION
      }
    case actionTypes.CREATING_IMG_ANNOTATION_SUCCESS:
      return {
        ...state,
        started:false,
        error:false,
        actionType: actionTypes.CREATING_IMG_ANNOTATION_SUCCESS
      }
    case actionTypes.CREATING_IMG_ANNOTATION_FAILURE:
      return {
        ...state,
        started:false,
        error: true,
        actionType: actionTypes.CREATING_IMG_ANNOTATION_FAILURE
      }
    default:
      return state
  }
}