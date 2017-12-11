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
import SemanticPropertiesReducer from './semanticPropertiesReducer';
import ProfileReducer from './profileReducer';

const rootReducer = combineReducers({
    dataReducer,
    ImageContentReducer,
    AuthReducer,
    RegistrationReducer,
    HomeReducer,
    ContentReducer,
    AnnotationReducer,
    SemanticBodiesReducer,
    SemanticAnnotationReducer,
    SemanticPropertiesReducer,
    ProfileReducer,
});

export default rootReducer;