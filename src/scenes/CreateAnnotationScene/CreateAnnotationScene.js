import React, { Component } from 'react';
import { connect } from 'react-redux';
import { style } from '@style/main';
import privateStyle from './style';
import { ZImageView, ZTextArea, ZButton, ZRichTextEditor } from '@components/index';
import { View, Dimensions, Image, Text, ScrollView, TouchableHighlight, TextInput } from 'react-native';
import {createResponder} from 'react-native-gesture-responder';



export class CreateAnnotationScene extends Component {

    constructor(props) {

      super(props);

      //BRK DELETE

                  let gestureState = {};
      let selectorSize = 100;
      let x = 50;
      let y = 50;

      //BRK DELETE


      this.state = {
        containerWidth:0,
        containerWidth:0,

        //BRK DELETE
        gestureState: gestureState,
        selectorSize: selectorSize,
        x: x,
        y: y
        //BRK DELETE
      }




    }

    calculateContentContainerSize(...params){
      
      this.setState({ 
        containerWidth: params[0].width,
        containerHeight: params[0].height 
      }) 

      console.log(params[0].width, params[0].height )
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

          this.setState({
            gestureState: { ...gestureState },
            x, y, selectorSize
          });
        }
      });
    }

    render(){

      let content = this.props.contents.find(content => content.id === this.props.navigation.state.params.contentId);


      //BRK DELETE
      const selectorSize = this.state.selectorSize;
      const areaSelectorDynamicStyle = {
        width: selectorSize,
        height: selectorSize,
        left: this.state.x - selectorSize/2,
        top: this.state.y - selectorSize/2
      };
      //BRK DELETE

      return(
        <View style={[style.zPage]}>

          <View style={privateStyle.content} >
            {
              content.story_items.map((story) => {

                if(story.type === 'image'){

                  return(
                    <View key={story.id} style={privateStyle.contentContainer}>
                    <View  style={privateStyle.contentContainer}
                    onLayout={(event) => { this.calculateContentContainerSize(event.nativeEvent.layout) }}>
                      <View style={privateStyle.contentPresenter} {...this.gestureResponder}>
                        <Image style={privateStyle.imageContent}
                          source={{uri: story.content}}
                          style={{ width: this.state.containerWidth, height: this.state.containerHeight }}>
                            <View pointerEvents='none' 
                              style={[privateStyle.areaSelector, areaSelectorDynamicStyle]}/>
                        </Image>
                      </View>
                      </View>
                    </View>
                  )

                } else if(story.type === 'text') {

                  return(
                    <View key={story.id} style={privateStyle.contentContainer}>
                      <TextInput 
                        multiline={true}
                        autoFocus={true}
                        editable={false}
                        value={story.content}
                        style={privateStyle.textContent}>
                      </TextInput>
                    </View>
                  )
                }

              })
            }
          </View>

          {/*
          <View style={privateStyle.editorContainer}>
            <ZRichTextEditor placeholder={'Enter annotation content here.'}
              onTextChange={(text) => this.setState({text})}/>
          </View>

          <View style={privateStyle.footer}>
              <TouchableHighlight style={privateStyle.button} onPress={()=> {}}>
                <Text style={privateStyle.buttonText}> 
                  Annotate
                </Text>
              </TouchableHighlight>
          </View>
          */}

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