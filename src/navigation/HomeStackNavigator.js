import React from 'react';
import { StackNavigator } from 'react-navigation';

import { 
	HomeScene, 
	ImageContentScene,
	ImageAnnotationScene, 
	TextContentScene, 
	TextAnnotationScene 
} from '@scenes';

const HomeStackNavigator = StackNavigator({
  Home: { screen: HomeScene },
  ImageContent: { screen: ImageContentScene },
  ImageAnnotation: { screen: ImageAnnotationScene },
  TextContent: { screen: TextContentScene },
  TextAnnotation: { screen: TextAnnotationScene }

});

export default HomeStackNavigator;