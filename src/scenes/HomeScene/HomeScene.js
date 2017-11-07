import React, { Component } from 'react';
import { connect } from 'react-redux';
import { style } from '@style/main';
import privateStyle from './style';
import { View, Text } from 'react-native';
import { ZButton } from '@components';



export class HomeScene extends Component {

  static navigationOptions = { header: <Text style={{ display:"none" }} ></Text> };
  
  render(){

    const { navigate } = this.props.navigation;

  	return(
      <View style={[style.zPage]}>

        <ZButton text="Create Text Annotation" 
                            buttonStyle={{width:170}}
                            onPress={() => navigate('TextAnnotation')}/>

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