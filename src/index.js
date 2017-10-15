import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '@store';
import TestContainer from '@containers/TestContainer';

const store = configureStore();

const Kernel = () => (
  <Provider store={store}>
    <TestContainer/>
  </Provider>
)

export default Kernel;