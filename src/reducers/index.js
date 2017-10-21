import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import imageAnnotationReducer from './imageAnnotationReducer';

const rootReducer = combineReducers({
    dataReducer,
    imageAnnotationReducer
})

export default rootReducer;