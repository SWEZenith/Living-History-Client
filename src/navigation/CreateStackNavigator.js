import React from 'react';
import { StackNavigator } from 'react-navigation';

import { CreateContentScene, ImageContentCreateScene, CreateTextContentScene } from '@scenes';

const CreateStackNavigator = StackNavigator({
  CreateContent: {
    screen: CreateContentScene
  },
  CreateImageContent: {
  	screen: ImageContentCreateScene
  },
  CreateTextContent: {
  	screen: CreateTextContentScene
  }

});

export default CreateStackNavigator;