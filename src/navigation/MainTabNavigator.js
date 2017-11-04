import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';

import HomeStackNavigator from './HomeStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import CreateStackNavigator from './CreateStackNavigator';

import { colors, style } from '@style/main';

const MainTabNavigator = TabNavigator({
  HomeStack: {
    screen: HomeStackNavigator,
    name: 'HomeStack',
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('@icons/home.png')}
          style={{width: 26, height: 26, tintColor: tintColor}}
        />
      )
    }
  },
  CreateContentStack: {
    screen: CreateStackNavigator,
    name: 'CreateContentStack',
    navigationOptions: {
      tabBarLabel:'Create',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('@icons/add.png')}
          style={{width: 26, height: 26, tintColor: tintColor}}
        />
      )
    }
  },
  ProfileStack: {
    screen: ProfileStackNavigator,
    name: 'ProfileStack',
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('@icons/profile.png')}
          style={{width: 26, height: 26, tintColor: tintColor}}
        />
      )
    }
  }
}, {
  initialRouteName: 'HomeStack',
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: colors.mainColor
  }
});

export default MainTabNavigator;