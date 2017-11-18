import React from 'react';
import { StackNavigator } from 'react-navigation';
import {
	CreateContentScene
} from '@scenes';


const CreateStackNavigator = StackNavigator({
  CreateContent: {
    screen: CreateContentScene
  }
});

export default CreateStackNavigator;