import * as actionTypes from '@actions/actionTypes';

const initialState = {
  annotations: []
}

export default function ImageContentReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_ANNOTATIONS:
      return {
        ...state,
        actionType: actionTypes.FETCH_ANNOTATIONS
      }
    case actionTypes.FETCH_ANNOTATIONS_SUCCESS:
      return {
        ...state,
        annotations: action.annotations,
        actionType: actionTypes.FETCH_ANNOTATIONS_SUCCESS
      }
    case actionTypes.FETCH_ANNOTATIONS_FAILURE:
      return {
        ...state,
        actionType: actionTypes.FETCH_ANNOTATIONS_FAILURE
      }
    default:
      return state
  }
}