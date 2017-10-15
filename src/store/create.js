import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reduxThunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers'


const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

const enhancer = compose(
  applyMiddleware(
    reduxThunkMiddleware,
    loggerMiddleware
  )
)

export default function configureStore(initialState): Store {
  const store = createStore(
    combineReducers({ ...reducers }),
    initialState,
    enhancer
  )

  return store;
}