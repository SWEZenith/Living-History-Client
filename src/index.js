import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '@store';
import { StackNavigator } from 'react-navigation';
import { ImageAnnotationScene, ImageContentScene } from '@scenes';


const store = configureStore();

const Navigation = StackNavigator({
  ImageContent: { screen: ImageContentScene },
  ImageAnnotation: { screen: ImageAnnotationScene }
});

const Kernel = () => (
  <Provider store={store}>
    <Navigation/>
  </Provider>
)

export default Kernel;