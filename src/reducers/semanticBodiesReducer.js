import * as actionTypes from '@actions/actionTypes';

const initialState = {
  semanticBodies: [],
  isSemanticBodiesFetched: false,
  error: '',
  isFetchDone: false
}

export default function SemanticBodiesReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_SEMANTIC_BODIES:
      return {
        ...state,
        actionType: actionTypes.FETCH_SEMANTIC_BODIES
      }
    case actionTypes.FETCH_SEMANTIC_BODIES_SUCCESS:
      return {
        ...state,
        isSemanticBodiesFetched: true,
        semanticBodies: action.semanticBodies,
        isFetchDone: true,
        actionType: actionTypes.FETCH_SEMANTIC_BODIES_SUCCESS
      }
    case actionTypes.FETCH_SEMANTIC_BODIES_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetchDone: true,
        actionType: actionTypes.FETCH_SEMANTIC_BODIES_FAILURE
      }      
    default:
      return state
  }
}