import * as actionTypes from '@actions/actionTypes';

const initialState = {
  isRegistered:false,
  error: ''
}

export default function RegistrationReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.REGISTER_TO_SYSTEM:
      return {
        ...state,
        actionType: actionTypes.REGISTER_TO_SYSTEM
      }
    case actionTypes.REGISTER_TO_SYSTEM_SUCCESS:
      return {
        ...state,
        isRegistered: true,
        actionType: actionTypes.REGISTER_TO_SYSTEMSUCCESS
      }
    case actionTypes.REGISTER_TO_SYSTEM:
      return {
        ...state,
        isRegistered: false,
        error: action.error,
        actionType: actionTypes.REGISTER_TO_SYSTEM_FAILURE
      }
    default:
      return state
  }
}