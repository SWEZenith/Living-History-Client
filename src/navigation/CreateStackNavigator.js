import React from 'react';
import { StackNavigator } from 'react-navigation';

<<<<<<< HEAD
import {
	CreateContentScene,
	CreateImageContentScene,
	CreateTextContentScene,
	TextAnnotationScene
} from '@scenes';
=======
import { CreateContentScene, ImageContentCreateScene, CreateTextContentScene } from '@scenes';
>>>>>>> upstream/master

const CreateStackNavigator = StackNavigator({
  CreateContent: {
    screen: CreateContentScene
  },
  CreateImageContent: {
  	screen: ImageContentCreateScene
  },
  CreateTextContent: {
  	screen: CreateTextContentScene
  },
  TextAnnotation: {
  	screen: TextAnnotationScene
  }
});

export default CreateStackNavigator;