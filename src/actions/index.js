import * as actionTypes from '@actions/actionTypes';
import getPeople from '@utils/api';


export function getData() {
  return {
    type: actionTypes.FETCHING_DATA
  }
}

export function getDataSuccess(data) {
  return {
    type: actionTypes.FETCHING_DATA_SUCCESS,
    data,
  }
}

export function getDataFailure() {
  return {
    type: actionTypes.FETCHING_DATA_FAILURE
  }
}

export function fetchData() {
   return (dispatch) => {
    dispatch(getData())
    getPeople()
      .then((data) => {
        dispatch(getDataSuccess(data))
      })
      .catch((err) => console.log('err:', err))
  }
}