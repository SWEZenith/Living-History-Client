import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from '@style/main';
import privateStyle from './style';
import { ZImageView, ZTextArea, ZButton } from '@components/index';
import ReactNative from 'react-native';
import { fetchContents } from '@actions';
import { AnnotationFactory } from '@common';
import { AnnotationTypes } from '@enums';
import { ImageTarget, BaseAnnotationBody } from '@models';
const {
  ScrollView,
  View,
  TextInput,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet,
} = ReactNative



export class ProfileScene extends Component {

    componentDidMount(){
      this.props.fetchContents();
    }

    render(){
      
      let contents = this.props.appData.contents;

      return(
      <View style={privateStyle.scene}>

        <ScrollView style={privateStyle.scrollSection}>
          {contents.map((content) => {
            return (
              <TouchableHighlight key={content.id} 
                  style={privateStyle.resultButton} 
                  onPress={ () => this.props.navigation.navigate('ContentDetail', { contentId: content.id }) }>
                <View>
                  <Image source={ { uri: content.cover_image } } style={privateStyle.resultImage} />
                  <Text style={ privateStyle.resultText } >{content.title}</Text>
                </View>
              </TouchableHighlight>
            )
          })}
        </ScrollView>
      </View>
      )
    }

}

function mapStateToProps (state) {
  return {
    appData: state.HomeReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchContents: () => dispatch(fetchContents())
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(ProfileScene);
