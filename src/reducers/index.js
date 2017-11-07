import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import ImageAnnotationReducer from './imageAnnotationReducer';
import ImageContentReducer from './imageContentReducer';
import AuthReducer from './authReducer';
import RegistrationReducer from './registrationReducer';
import HomeReducer from './homeReducer';
import CreateImageContentReducer from './createImageContentReducer';

const rootReducer = combineReducers({
    dataReducer,
    ImageAnnotationReducer,
    ImageContentReducer,
    AuthReducer,
    RegistrationReducer,
    HomeReducer,
    CreateImageContentReducer,
})

export default rootReducer;