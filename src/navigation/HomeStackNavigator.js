import React from 'react';
import { StackNavigator } from 'react-navigation';

import { 
	HomeScene,
	ContentDetailScene,
	AnnotationDetailScene,
	CreateAnnotationScene,
	CreateSemanticAnnotationScene
} from '@scenes';

const HomeStackNavigator = StackNavigator({
  Home: { screen: HomeScene },
  ContentDetail: { screen: ContentDetailScene },
  AnnotationDetail:{ screen: AnnotationDetailScene },
  CreateAnnotation: { screen: CreateAnnotationScene },
  CreateSemanticAnnotation: { screen: CreateSemanticAnnotationScene },
});

export default HomeStackNavigator;