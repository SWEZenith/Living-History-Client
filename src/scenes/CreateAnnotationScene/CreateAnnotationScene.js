import React, { Component } from 'react';
import { connect } from 'react-redux';
import { style } from '@style/main';
import privateStyle from './style';
import { ZImageView, ZTextArea, ZButton, ZRichTextEditor } from '@components/index';
import { View, Dimensions, Image, Text, ScrollView, TouchableHighlight, TextInput } from 'react-native';
import {createResponder} from 'react-native-gesture-responder';
import { AnnotationTypes } from '@enums';
import { AnnotationFactory } from '@common';
import { TextTarget, ImageTarget, BaseAnnotationBody } from '@models';
import * as constants from '@utils/constants';
import { StorageHelper } from '@utils';
import { createAnnotation } from '@actions';


class ViewTypes {
  static EditorView = 'EditorView';
  static ContentView = 'ContentView';
}



export class CreateAnnotationScene extends Component {

    constructor(props) {

      super(props);

      let gestureState = {};
      let selectorSize = 100;
      let x = 50;
      let y = 50;

      this.state = {
        containerWidth:0,
        containerHeight:0,
        gestureState: gestureState,
        selectorSize: selectorSize,
        x: x,
        y: y,
        currentVisibleImageIndex:-1,
        imageIndexes:[],

        currentView: ViewTypes.ContentView,
        annotationType:'',
        annotationText:'',
        targetId:'',

        startIndex: -1,
        endIndex: -1


      }
    }

    renderIf(condition, content){
      
      return condition ? content : null;
    }

    calculateContentContainerSize(...params){
      
      this.setState({ 
        containerWidth: params[0].width,
        containerHeight: params[0].height 
      }) 
    }

    componentDidMount() {

      let content = this.props.contents.find(content => content.id === this.props.navigation.state.params.contentId);      
      
      let imageIndex = -1;
      let imageIndexes = [];
      
      content.story_items.forEach((item,index)=>{
        
        if(item.type === 'image') {

          imageIndexes.push(index)

          if(imageIndex == -1)
            imageIndex = index;
        }
      })

      this.setState({
        currentVisibleImageIndex: imageIndex,
        imageIndexes: imageIndexes
      })
    }

    componentWillMount(nextProps) {


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

          let {x, y, containerWidth, containerHeight} = this.state;

          let xDiff = (gestureState.moveX - gestureState.previousMoveX);
          let yDiff = (gestureState.moveY - gestureState.previousMoveY);
          let selectorHalfSize = selectorSize / 2;

          if(((x - selectorHalfSize) + xDiff) > 0 
            && ((x + selectorHalfSize) + xDiff) < containerWidth
            && ((y - selectorHalfSize) + yDiff) >= 0
            && ((y + selectorHalfSize) + yDiff) <= containerHeight) {

            x += (gestureState.moveX - gestureState.previousMoveX);
            y += (gestureState.moveY - gestureState.previousMoveY);          
          }


          let story = this.getCurrentImageStory();

          this.setState({
            gestureState: { ...gestureState },
            x,
            y,
            selectorSize,
            annotationType: AnnotationTypes.ImageAnnotation,
            targetId: story.id
          });
        }
      });
    }

    getCurrentImageStory() {

      let content = this.props.contents.find(content => content.id === this.props.navigation.state.params.contentId);
      
      return content.story_items[this.state.currentVisibleImageIndex];
    }

    showNextImage(){

      let currentIndex = this.state.imageIndexes.indexOf(this.state.currentVisibleImageIndex);
      let nextIndex;

      if(currentIndex + 1 >= this.state.imageIndexes.length)
        nextIndex = this.state.imageIndexes[0];
      else
        nextIndex = this.state.imageIndexes[currentIndex + 1];        

      this.setState({
        currentVisibleImageIndex: nextIndex
      })
    }

    showPreviousImage(){

      let currentIndex = this.state.imageIndexes.indexOf(this.state.currentVisibleImageIndex);
      let nextIndex;

      if(currentIndex - 1 < 0)
        nextIndex = this.state.imageIndexes[this.state.imageIndexes.length - 1];
      else
        nextIndex = this.state.imageIndexes[currentIndex - 1];        

      this.setState({
        currentVisibleImageIndex: nextIndex
      })
    }

    switchToEditorView() {

      this.setState({
        currentView: ViewTypes.EditorView
      })

    }

    approveSelection() {

      this.switchToEditorView();
    }

    handleAnnotationTextSelection(event, story) {

      this.setState({
        startIndex: event.nativeEvent.selection.start,
        endIndex: event.nativeEvent.selection.end,
        annotationType: AnnotationTypes.TextAnnotation,
        targetId: story.id
      });
    }

    handleEditorTextChange(text) {

      this.setState({
        annotationText: text
      })
    }

    async handleAnnotationCreation() {

      if(this.state.annotationType == AnnotationTypes.ImageAnnotation) {

        let story = this.getCurrentImageStory();

        Image.getSize(story.content, async (actualWidth, actualHeight) => {
        
          let annotation = AnnotationFactory.createAnnotation(AnnotationTypes.ImageAnnotation);
          annotation.target = new ImageTarget();
          annotation.body = new BaseAnnotationBody();

          let userName = await StorageHelper.get(constants.USERNAME);
          annotation.setProperty('creator', constants.API_URI + '/users/' + userName);
          annotation.setProperty('created', Date.now());
          annotation.setProperty('modified', Date.now());

          annotation.target.url = constants.API_URI + "/stories/" + this.state.targetId;
          annotation.target.x = ((actualWidth * (this.state.x - this.state.selectorSize / 2)) / this.state.containerWidth);
          annotation.target.y = ((actualHeight * (this.state.y - this.state.selectorSize / 2)) / this.state.containerHeight);
          annotation.target.w = this.state.selectorSize;
          annotation.target.h = this.state.selectorSize;
          annotation.body.value = this.state.annotationText;

          this.props.createAnnotation(annotation)

          console.log(annotation.getObjectRepresentation());
        })


      } else if(this.state.annotationType === AnnotationTypes.TextAnnotation) {

        let annotation = AnnotationFactory.createAnnotation(AnnotationTypes.TextAnnotation);
        annotation.target = new TextTarget();
        annotation.body = new BaseAnnotationBody();

        let userName = await StorageHelper.get(constants.USERNAME);
        annotation.setProperty('creator', constants.API_URI + '/users/' + userName);
        annotation.setProperty('created', Date.now());
        annotation.setProperty('modified', Date.now());

        annotation.target.url = constants.API_URI + "/stories/" + this.state.targetId;
        annotation.target.start = this.state.startIndex;
        annotation.target.end = this.state.endIndex;
        annotation.body.value = this.state.annotationText;

        this.props.createAnnotation(annotation)
        console.log(annotation.getObjectRepresentation());
        

      } else {
        console.log('nothing selected!');
      }

    }

    render(){

      let content = this.props.contents.find(content => content.id === this.props.navigation.state.params.contentId);
      const areaSelectorDynamicStyle = {
        width: this.state.selectorSize,
        height: this.state.selectorSize,
        left: this.state.x - this.state.selectorSize/2,
        top: this.state.y - this.state.selectorSize/2
      };

      return(
        <View style={[style.zPage]}>

          {
            this.renderIf(
              this.state.currentView == ViewTypes.ContentView,
              <View style={privateStyle.content}>
                <View style={privateStyle.imageContentContainer}>
                  {
                    content.story_items.map((story, index) => {
                      if(story.type === 'image') {

                        return(
                          <View key={story.id} 
                            style={[
                              privateStyle.contentContainer,
                              {
                                display: this.state.currentVisibleImageIndex == index ? 'flex' : 'none'
                              }
                            ]}>
                            <View  style={privateStyle.contentContainer}
                              onLayout={(event) => { this.calculateContentContainerSize(event.nativeEvent.layout) }}>
                              <View style={privateStyle.contentPresenter} {...this.gestureResponder}>
                                <Image style={privateStyle.imageContent}
                                  source={{uri: story.content}}
                                  style={{ 
                                    width: this.state.containerWidth,
                                    height: this.state.containerHeight
                                  }}>
                                  <View pointerEvents='none' 
                                    style={[privateStyle.areaSelector, areaSelectorDynamicStyle]}/>
                                </Image>
                              </View>
                            </View>
                          </View>
                        )
                      }
                    })
                  }
                  <TouchableHighlight onPress={()=> this.showPreviousImage()}>
                    <Text>
                      Show Previous Image
                    </Text>
                  </TouchableHighlight>

                  <TouchableHighlight onPress={()=> this.showNextImage()}>
                    <Text>
                      Show Next Image
                    </Text>
                  </TouchableHighlight>
                </View>


                <View style={{flex:1}}>
                  <ScrollView style={{flex:1}}>
                  {
                    content.story_items.map((story, index) => {
                      if(story.type === 'text') {

                        return(
                          <TextInput 
                            key={story.id}
                            multiline={true}
                            autoFocus={true}
                            editable={false}
                            value={story.content}
                            style={privateStyle.textContent}
                            onSelectionChange={(event) => this.handleAnnotationTextSelection(event, story)}>
                          </TextInput>
                        )
                      }
                    })
                  }
                  </ScrollView>
                </View>
              </View>
            )
          }

          {
            this.renderIf(
              this.state.currentView == ViewTypes.ContentView,
              <View style={{flex:1, justifyContent:'flex-end'}}>
                <TouchableHighlight style={privateStyle.button} onPress={()=> this.approveSelection()}>
                  <Text style={privateStyle.buttonText}> 
                    Approve Selection
                  </Text>
                </TouchableHighlight>
              </View>
            )
          }

          {
            this.renderIf(
              this.state.currentView == ViewTypes.EditorView,
              <View style={privateStyle.editorContainer}>
                <ZRichTextEditor placeholder={'Enter annotation content here.'}
                  onTextChange={(text)=> this.handleEditorTextChange(text)}/>
              </View>
            )
          }

          {
            this.renderIf(
              this.state.currentView == ViewTypes.EditorView,
              <View style={privateStyle.footer}>
                  <TouchableHighlight style={privateStyle.button} onPress={()=> this.handleAnnotationCreation()}>
                    <Text style={privateStyle.buttonText}> 
                      Annotate
                    </Text>
                  </TouchableHighlight>
              </View>
            )
          }

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
    createAnnotation: (annotation) => dispatch(createAnnotation(annotation))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(CreateAnnotationScene);