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


export class ImageAnnotationScene extends Component {

    constructor(props) {

      super(props);

      let gestureState = {};
      let selectorSize = 100;
      let x = 50;
      let y = 50;

      this.state = {
        gestureState: gestureState,
        selectorSize: selectorSize,
        x: x,
        y: y,
        contentWidth: 0,
        contentHeight: 0,
        contentUri: '',
        contentId: '',
        annotationText:''
      }

    }

    handleEditorTextChange(text) {

      this.state.annotationText = text;
    }

    handleAnnotationCreation() {

      Image.getSize(this.state.contentUri, (actualWidth, actualHeight) => {
        

        let annotation = AnnotationFactory.createAnnotation(AnnotationTypes.ImageAnnotation);
        annotation.target = new ImageTarget();
        annotation.body = new BaseAnnotationBody();
        // BRK TODO get target url from content object.
        //annotation.target.url = constants.API_URI + "/content/" + this.state.contentId;
        annotation.target.url = this.state.contentId;
        annotation.creator = "bulent";
        // BRK TODO
        annotation.target.x = ((actualWidth * (this.state.x - this.state.selectorSize / 2)) / this.state.contentWidth);
        annotation.target.y = ((actualHeight * (this.state.y - this.state.selectorSize / 2)) / this.state.contentHeight);
        annotation.target.w = this.state.selectorSize;
        annotation.target.h = this.state.selectorSize;
        annotation.body.value = this.state.annotationText;

        // BRK DELETE
        console.log(annotation.getObjectRepresentation());        

        this.props.createImageAnnotation(annotation);
      });
    }

    handleContentSizeMeasurement(...params){

      this.setState({ 
        contentWidth: params[0].width, 
        contentHeight: params[0].height
      });
    }

    componentWillMount(nextProps) {
      
      if(this.props.isSuccessfull === false && this.nextProps.isSuccessfull === true)
        this.props.navigation.goBack();

  
    
      this.gestureResponder = createResponder({
        
        onStartShouldSetResponder: (evt, gestureState) => true,
        onStartShouldSetResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetResponder: (evt, gestureState) => true,
        onMoveShouldSetResponderCapture: (evt, gestureState) => true,
        onResponderTerminationRequest: (evt, gestureState) => true,
        onResponderTerminate: (evt, gestureState) => {},
        onResponderSingleTapConfirmed: (evt, gestureState) => {},
        onResponderGrant: (evt, gestureState) => {},
        onResponderRelease: (evt, gestureState) => this.setState({ gestureState: { ...gestureState }}),
        onResponderMove: (evt, gestureState) => {

          let selectorSize = this.state.selectorSize;
          
          if (gestureState.pinch && gestureState.previousPinch)
            selectorSize *= (gestureState.pinch / gestureState.previousPinch)

          let {x, y, contentWidth, contentHeight} = this.state;

          let xDiff = (gestureState.moveX - gestureState.previousMoveX);
          let yDiff = (gestureState.moveY - gestureState.previousMoveY);
          let selectorHalfSize = selectorSize / 2;
          
          if(((x - selectorHalfSize) + xDiff) > 0 
            && ((x + selectorHalfSize) + xDiff) < contentWidth
            && ((y - selectorHalfSize) + yDiff) > 0
            && ((y + selectorHalfSize) + yDiff) < contentHeight) {
          
            x += (gestureState.moveX - gestureState.previousMoveX);
            y += (gestureState.moveY - gestureState.previousMoveY);          
          }

          this.setState({
            gestureState: { ...gestureState },
            x, y, selectorSize
          });
        }
      });
    }

    componentDidMount() {

      //BRK TODO fetch content here.

      let content = this.props.contents.contents.find(content => content.id === this.props.navigation.state.params.contentId);

      this.setState({
        contentUri: content.description,
        contentId: content.id
      });
    }

    render(){

      const { navigate } = this.props.navigation;
      const selectorSize = this.state.selectorSize;
      const areaSelectorDynamicStyle = {
        width: selectorSize,
        height: selectorSize,
        left: this.state.x - selectorSize/2,
        top: this.state.y - selectorSize/2
      };

    	return(
        <View style={[style.zPage]}>

          <View style={privateStyle.pageContainer}>

            <View style={privateStyle.contentContainer}>
              <View style={privateStyle.contentContainer}>
                <View style={privateStyle.contentPresenter} {...this.gestureResponder}>
                  <Image style={privateStyle.imageContent} 
                    source={{uri: this.state.contentUri}}
                    onLayout={(event) => { this.handleContentSizeMeasurement(event.nativeEvent.layout) }}>        
                    <View pointerEvents='none' style={[privateStyle.areaSelector, areaSelectorDynamicStyle]}/>
                  </Image>
                </View>
              </View>
            </View>

            <View style={privateStyle.editorContainer}>
              <ZRichTextEditor placeholder={'Enter annotation content here.'}
                onTextChange={(text)=> this.handleEditorTextChange(text)}/>
            </View>

            <View style={privateStyle.footer}>
              <ZButton text="Annotate" 
                onPress={() => this.handleAnnotationCreation()}/>
            </View>
          </View>

        </View>
		  )
    }

}

function mapStateToProps (state) {
  return {
    appData: state.imageAnnotationReducer,
    contents: state.HomeReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createImageAnnotation: (annotationContent) => dispatch(createImageAnnotation(annotationContent))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(ImageAnnotationScene);