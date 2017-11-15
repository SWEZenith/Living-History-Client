import * as actionTypes from '@actions/actionTypes';

const initialState = {
  started:false,
  isSuccessfull: false,
  error: ''
}

export default function SemanticAnnotationReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.CREATE_SEMANTIC_ANNOTATION:
      return {
        ...state,
        started: true,
        actionType: actionTypes.CREATE_SEMANTIC_ANNOTATION
      }
    case actionTypes.CREATE_SEMANTIC_ANNOTATION_SUCCESS:
      return {
        ...state,
        started:false,
        isSuccessfull: true,
        actionType: actionTypes.CREATE_SEMANTIC_ANNOTATION_SUCCESS
      }
    case actionTypes.CREATE_SEMANTIC_ANNOTATION_FAILURE:
      return {
        ...state,
        started:false,
        isSuccessfull: false,
        error: action.error,
        actionType: actionTypes.CREATE_SEMANTIC_ANNOTATION_FAILURE
      }
    default:
      return state
  }
}