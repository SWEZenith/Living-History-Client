import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import ImageAnnotationReducer from './imageAnnotationReducer';
import ImageContentReducer from './imageContentReducer';
import AuthReducer from './authReducer';
import RegistrationReducer from './registrationReducer';
import TextAnnotationReducer from './textAnnotationReducer';
import HomeReducer from './homeReducer';
import ContentReducer from './contentReducer';
import SemanticBodiesReducer from './semanticBodiesReducer';
import SemanticAnnotationReducer from './semanticAnnotationReducer';

const rootReducer = combineReducers({
    dataReducer,
    ImageAnnotationReducer,
    ImageContentReducer,
    AuthReducer,
    RegistrationReducer,
    TextAnnotationReducer,
    HomeReducer,
    ContentReducer,
    SemanticBodiesReducer,
    SemanticAnnotationReducer
})

export default rootReducer;