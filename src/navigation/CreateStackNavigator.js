import React from 'react';
import { StackNavigator } from 'react-navigation';

import { CreateContentScene, CreateImageContentScene, CreateTextContentScene } from '@scenes';

const CreateStackNavigator = StackNavigator({
  CreateContent: {
    screen: CreateContentScene
  },
  CreateImageContent: {
  	screen: CreateImageContentScene
  },
  CreateTextContent: {
  	screen: CreateTextContentScene
  }

});

export default CreateStackNavigator;