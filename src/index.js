import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '@store';
//import TextContentExampleContainer from '@containers/TextContentExampleContainer';
//import ImageContentExampleContainer from '@containers/ImageContentExampleContainer';
import ImageAnnotationContainer from '@containers/ImageAnnotationContainer/ImageAnnotationContainer';


const store = configureStore();

const Kernel = () => (
  <Provider store={store}>
    <ImageAnnotationContainer/>
  </Provider>
)

export default Kernel;