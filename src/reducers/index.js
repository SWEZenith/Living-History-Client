import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import ImageAnnotationReducer from './imageAnnotationReducer';
import ImageContentReducer from './imageContentReducer';
import AuthReducer from './authReducer';
import RegistrationReducer from './registrationReducer';

const rootReducer = combineReducers({
    dataReducer,
    ImageAnnotationReducer,
    ImageContentReducer,
    AuthReducer: AuthReducer,
    RegistrationReducer
})

export default rootReducer;