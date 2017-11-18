import React, { Component } from 'react';
import { connect } from 'react-redux';
import { style } from '@style/main';
import privateStyle from './style';
import { ZImageView, ZTextArea, ZButton, ZRichTextEditor } from '@components/index';
import { View, Dimensions, Image, Text } from 'react-native';
import { createImageAnnotation } from '@actions';
import { AnnotationFactory } from '@common';
import { AnnotationTypes } from '@enums';
import { ImageTarget, BaseAnnotationBody } from '@models';
import {createResponder} from 'react-native-gesture-responder';
const {width, height} = Dimensions.get('window');
import * as constants from '@utils/constants';


export class CreateAnnotationScene extends Component {

    constructor(props) {

      super(props);
    }



    render(){

      let content = this.props.contents.find(content => content.id === this.props.navigation.state.params.contentId);

      return(
        <View style={[style.zPage]}>
          <Text>
          asdasdsadsa
          </Text>
        </View>
      )
    }

}

function mapStateToProps (state) {
  return {
    contents: state.HomeReducer.contents
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(CreateAnnotationScene);