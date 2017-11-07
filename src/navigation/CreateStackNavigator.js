import React from 'react';
import { StackNavigator } from 'react-navigation';

import {
	CreateContentScene,
	CreateImageContentScene,
	CreateTextContentScene,
	TextAnnotationScene
} from '@scenes';

const CreateStackNavigator = StackNavigator({
  CreateContent: {
    screen: CreateContentScene
  },
  CreateImageContent: {
  	screen: CreateImageContentScene
  },
  CreateTextContent: {
  	screen: CreateTextContentScene
  },
  TextAnnotation: {
  	screen: TextAnnotationScene
  }
});

export default CreateStackNavigator;