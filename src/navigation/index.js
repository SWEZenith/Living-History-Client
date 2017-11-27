import React, { Component } from 'react';
import { connect } from 'react-redux';

import MainTabNavigator from './MainTabNavigator';
import SignStackNavigator from './SignStackNavigator';


class Router extends Component {

  render() {
    const { appData } = this.props;
    return (
      //!appData.isAuthenticated ?
      //<SignStackNavigator onNavigationStateChange={null} />
      //:
      <MainTabNavigator onNavigationStateChange={null} />
    );
  }
}


function mapStateToProps (state) {
  return {
    appData: state.AuthReducer
  }
}

export default connect(mapStateToProps)(Router);