import React, { Component } from 'react';
import { connect } from 'react-redux';
import { style } from '@style/main';
import privateStyle from './style';
import { View, Text } from 'react-native';



export class HomeScene extends Component {

  static navigationOptions = { header: <Text style={{ display:"none" }} ></Text> };
  
  render(){
  	return(
      <View style={[style.zPage]}>
        <View style={{flex:2}}>
          <Text>
            Home Scene
          </Text>
        </View>
      </View>
	  )
  }

}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(HomeScene);