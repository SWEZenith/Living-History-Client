import * as actionTypes from '@actions/actionTypes';

const initialState = {
  userContents: [],
  userAnnotations: []
};

export default function ProfileReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER_CONTENTS:
      return {
        ...state,
        actionType: actionTypes.FETCH_USER_CONTENTS
      };
    case actionTypes.FETCH_USER_CONTENTS_SUCCESS:
      return {
        ...state,
        userContents: action.userContents,
        actionType: actionTypes.FETCH_USER_CONTENTS_SUCCESS
      };
    case actionTypes.FETCH_USER_CONTENTS_FAILURE:
      return {
        ...state,
        actionType: actionTypes.FETCH_USER_CONTENTS_FAILURE
      };
    
    case actionTypes.FETCH_USER_ANNOTATIONS:
      return {
        ...state,
        actionType: actionTypes.FETCH_USER_ANNOTATIONS
      };
    case actionTypes.FETCH_USER_ANNOTATIONS_SUCCESS:
      return {
        ...state,
        userAnnotations: action.annotations,
        actionType: actionTypes.FETCH_USER_ANNOTATIONS_SUCCESS
      };
    case actionTypes.FETCH_USER_ANNOTATIONS_FAILURE:
      return {
        ...state,
        actionType: actionTypes.FETCH_USER_ANNOTATIONS_FAILURE
      };
    default:
      return state;
  }
}
