import * as actionTypes from '@actions/actionTypes';

const initialState = {
  started:false,
  isSuccessfull: false,
  error: ''
}

export default function SemanticPropertiesReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_SEMANTIC_PROPERTIES:
      return {
        ...state,
        started: true,
        actionType: actionTypes.FETCH_SEMANTIC_PROPERTIES
      }
    case actionTypes.FETCH_SEMANTIC_PROPERTIES_SUCCESS:
      return {
        ...state,
        started:false,
        isSuccessfull: true,
        semanticProperties: action.semanticProperties,
        actionType: actionTypes.FETCH_SEMANTIC_PROPERTIES_SUCCESS
      }
    case actionTypes.FETCH_SEMANTIC_PROPERTIES_FAILURE:
      return {
        ...state,
        started:false,
        isSuccessfull: false,
        error: action.error,
        actionType: actionTypes.FETCH_SEMANTIC_PROPERTIES_FAILURE
      }
    default:
      return state
  }
}