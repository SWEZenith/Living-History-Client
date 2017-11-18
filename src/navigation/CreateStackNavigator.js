import React from 'react';
import { StackNavigator } from 'react-navigation';
import {
	CreateContentScene,
	TextAnnotationScene,
} from '@scenes';


const CreateStackNavigator = StackNavigator({
  CreateContent: {
    screen: CreateContentScene
  },
  TextAnnotation: {
  	screen: TextAnnotationScene
  }
});

export default CreateStackNavigator;