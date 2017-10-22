import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '@store';
import ImageAnnotationScene from '@scenes/ImageAnnotationScene/ImageAnnotationScene';
//import ImageContentScene from '@containers/ImageContentScene/ImageContentScene';


const store = configureStore();

const Kernel = () => (
  <Provider store={store}>
    <ImageAnnotationScene/>
  </Provider>
)

export default Kernel;