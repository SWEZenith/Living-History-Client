import React from 'react';
import { StackNavigator } from 'react-navigation';

import { 
	HomeScene,
	MapScene,
	ContentDetailScene,
	AnnotationDetailScene,
	CreateAnnotationScene,
	CreateSemanticAnnotationScene,
} from '@scenes';

const HomeStackNavigator = StackNavigator({
  Home: { screen: HomeScene },
  Map: { screen: MapScene },
  ContentDetail: { screen: ContentDetailScene },
  AnnotationDetail: { screen: AnnotationDetailScene },
  CreateAnnotation: { screen: CreateAnnotationScene },
  CreateSemanticAnnotation: { screen: CreateSemanticAnnotationScene },
});

export default HomeStackNavigator;
