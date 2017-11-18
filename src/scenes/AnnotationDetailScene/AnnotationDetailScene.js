import React, { Component } from 'react';
import { connect } from 'react-redux';
import { style } from '@style/main';
import privateStyle from './style';
import { ZImageView, ZButton } from '@components/index';
import { View } from 'react-native';
import { FlatList, StyleSheet, Text, TouchableHighlight } from 'react-native';



export class AnnotationDetailScene extends Component {

    constructor(props) {
        super(props);
    }

    render(){

      
    	return(
        <View style={[style.zPage]}>
          <Text>anno</Text>
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

export default connect( mapStateToProps, mapDispatchToProps)(AnnotationDetailScene);