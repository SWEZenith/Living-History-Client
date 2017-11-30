import * as actionTypes from '@actions/actionTypes';
import { NetworkManager, ContentTypes } from '@utils';


///
/// Create semantic annotation
///

export function createSemanticAnnotation(content) {

   return (dispatch) => {
      dispatch(createSemanticAnnotationStart())
      saveSemanticAnnotation(content)
          .then(() => {
            dispatch(createSemanticAnnotationSuccess())
          })
          .catch((error) => {
            console.log('error:', error)
            dispatch(createSemanticAnnotationFailure(error))
          })
    }
}

export function createSemanticAnnotationStart() {
  return {
    type: actionTypes.CREATE_SEMANTIC_ANNOTATION
  }
}

export function createSemanticAnnotationSuccess() {
  return {
    type: actionTypes.CREATE_SEMANTIC_ANNOTATION_SUCCESS,
  }
}

export function createSemanticAnnotationFailure(error) {
  return {
    type: actionTypes.CREATE_SEMANTIC_ANNOTATION_FAILURE,
    error
  }
}

function saveSemanticAnnotation(semanticAnnotation) {

  semanticAnnotation.setProperty('created', Date.now());
  semanticAnnotation.setProperty('modified', Date.now());


  return new Promise((resolve, reject) => {

    return resolve(NetworkManager.post('/semantic/', 
      semanticAnnotation.getObjectRepresentation(), 
      ContentTypes.jsonLD)
    );
    
  });
}


///
/// Get semantic data
///

export function fetchSemanticBodies(keyword) {

   return (dispatch) => {
      dispatch(fetchSemanticBodiesStart())
      getSemanticBodies(keyword)
          .then((semanticBodies) => {
            dispatch(fetchSemanticBodiesSuccess(semanticBodies))
          })
          .catch((error) => {
            console.log('error:', error)
            dispatch(fetchSemanticBodiesFailure(error))
          })
    }
}

export function fetchSemanticBodiesStart() {
  return {
    type: actionTypes.FETCH_SEMANTIC_BODIES
  }
}

export function fetchSemanticBodiesSuccess(semanticBodies) {
  
  return {
    type: actionTypes.FETCH_SEMANTIC_BODIES_SUCCESS,
    semanticBodies
  }
}

export function fetchSemanticBodiesFailure(error) {
  return {
    type: actionTypes.FETCH_SEMANTIC_BODIES_FAILURE,
    error
  }
}


function getSemanticBodies(keyword) {

  return new Promise((resolve, reject) => {

    return resolve(NetworkManager.get(`/semantic/entities/${keyword}`, ContentTypes.json));
  });
}