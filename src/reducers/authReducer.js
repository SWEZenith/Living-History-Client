import * as actionTypes from '@actions/actionTypes';


const initialState = {
  isLoggingIn:false,
  isAuthenticated: false,
  error: '',
  actionType: ''
}

export default function AuthReducer (state = initialState, action) {
  switch (action.type) {

    case actionTypes.LOGIN_TO_SYSTEM:
      return {
        ...state,
        isLoggingIn: true,
        isAuthenticated: false,
        actionType: actionTypes.LOGIN_TO_SYSTEM
      }

    case actionTypes.LOGIN_TO_SYSTEM_SUCCESS:
      return {
        ...state,
        isLoggingIn:false,
        isAuthenticated:true,
        error: '',
        actionType: actionTypes.LOGIN_TO_SYSTEM_SUCCESS
      }

    case actionTypes.LOGIN_TO_SYSTEM_FAILURE:
      return {
        ...state,
        isLoggingIn:false,
        isAuthenticated: false,
        error: action.error,
        actionType: actionTypes.LOGIN_TO_SYSTEM_FAILURE
      }

    default:
      return state;
  }
}