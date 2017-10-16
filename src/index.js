import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '@store';
import TextContentExampleContainer from '@containers/TextContentExampleContainer';
import ImageContentExampleContainer from '@containers/ImageContentExampleContainer';

const store = configureStore();

const Kernel = () => (
  <Provider store={store}>
    <ImageContentExampleContainer/>
  </Provider>
)

export default Kernel;