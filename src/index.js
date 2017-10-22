import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '@store';
//import ImageAnnotationContainer from '@containers/ImageAnnotationContainer/ImageAnnotationContainer';
import ImageContentContainer from '@containers/ImageContentContainer/ImageContentContainer';


const store = configureStore();

const Kernel = () => (
  <Provider store={store}>
    <ImageContentContainer/>
  </Provider>
)

export default Kernel;