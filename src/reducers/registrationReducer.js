import * as actionTypes from '@actions/actionTypes';

const initialState = {
  started:false,
  error: false
}

export default function RegistrationReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.REGISTER_TO_SYSTEM:
      return {
        ...state,
        started: true,
        error: false,
        actionType: actionTypes.REGISTER_TO_SYSTEM
      }
    case actionTypes.REGISTER_TO_SYSTEM_SUCCESS:
      return {
        ...state,
        started:false,
        error:false,
        actionType: actionTypes.REGISTER_TO_SYSTEMSUCCESS
      }
    case actionTypes.REGISTER_TO_SYSTEM:
      return {
        ...state,
        started:false,
        error: true,
        actionType: actionTypes.REGISTER_TO_SYSTEM_FAILURE
      }
    default:
      return state
  }
}