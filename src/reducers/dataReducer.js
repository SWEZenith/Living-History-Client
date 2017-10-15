import * as actionTypes from '@actions/actionTypes';

const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false
}

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCHING_DATA:
      return {
        ...state,
        data: [],
        isFetching: true,
        actionType: actionTypes.FETCHING_DATA
      }
    case actionTypes.FETCHING_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
        actionType: actionTypes.FETCHING_DATA_SUCCESS
      }
    case actionTypes.FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        actionType: actionTypes.FETCHING_DATA_FAILURE
      }
    default:
      return state
  }
}