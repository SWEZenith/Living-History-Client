import React from 'react';
import { StackNavigator } from 'react-navigation';

import { HomeScene } from '@scenes';

const HomeStackNavigator = StackNavigator({
  Home: {
    screen: HomeScene
  }

});

export default HomeStackNavigator;