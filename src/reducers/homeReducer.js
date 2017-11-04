import * as actionTypes from '@actions/actionTypes';

const initialState = {
  contents: []
}

export default function HomeReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_CONTENTS:
      return {
        ...state,
        actionType: actionTypes.FETCH_CONTENTS
      }
    case actionTypes.FETCH_CONTENTS_SUCCESS:
      return {
        ...state,
        contents: action.contents,
        actionType: actionTypes.FETCH_CONTENTS_SUCCESS
      }
    case actionTypes.FETCH_CONTENTS_FAILURE:
      return {
        ...state,
        actionType: actionTypes.FETCH_CONTENTS_FAILURE
      }
    default:
      return state
  }
}