import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import ImageContentReducer from './imageContentReducer';
import AuthReducer from './authReducer';
import RegistrationReducer from './registrationReducer';
import AnnotationReducer from './annotationReducer';
import HomeReducer from './homeReducer';
import ContentReducer from './contentReducer';
import SemanticBodiesReducer from './semanticBodiesReducer';
import SemanticAnnotationReducer from './semanticAnnotationReducer';

const rootReducer = combineReducers({
    dataReducer,
    ImageContentReducer,
    AuthReducer,
    RegistrationReducer,
    HomeReducer,
    ContentReducer,

    SemanticBodiesReducer,
    SemanticAnnotationReducer,
    AnnotationReducer
})

export default rootReducer;