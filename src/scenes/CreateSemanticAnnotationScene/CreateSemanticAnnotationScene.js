import React, { Component } from 'react';
import { connect } from 'react-redux';
import { style, colors } from '@style/main';
import privateStyle from './style';
import { View, Text, TextInput, Button, Image, ScrollView, TouchableHighlight } from 'react-native';
import { ZButton, ZRichTextEditor } from '@components';
import { createSemanticAnnotation, fetchSemanticBodies } from '@actions';
import ModalDropdown from 'react-native-modal-dropdown';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator
} from 'react-native-indicators';
import { AnnotationTypes } from '@enums';
import { AnnotationFactory } from '@common';
import { TextTarget, ImageTarget, BaseAnnotationBody } from '@models';
import * as constants from '@utils/constants';
import { StorageHelper } from '@utils';
import { createAnnotation } from '@actions';


let textContentPats = [];
let annotations = [];
let startIndex = 0;



export class CreateSemanticAnnotationScene extends Component {

    constructor(props) {
      
      super(props);

      this.state = {
        startIndex: -1,
        endIndex: -1,
        selectedText: '',
        selectedBody:'',
        isDropdownDisabled: true,
        isFocused: true,
        isSpinnerShown: false,
        storyId:'-1'

      };
    }


    getContent() {

      let content = this.props.contents.find(content => content.id === this.props.navigation.state.params.contentId);      
      return content;
    }

    renderIf(condition, content){
      
      return condition ? content : null;
    } 

    handleTextSelection(event, story) {

      this.setState({
        startIndex: event.nativeEvent.selection.start,
        endIndex: event.nativeEvent.selection.end,
        storyId: story.id
      })
    }

    confirmTextSelection() {

      if(this.state.isFocused == true) {

        this.props.semanticBodyData.isFetchDone = false;
        this.setState({ isSpinnerShown: true });

        let story = this.getContent().story_items.find(s => s.id == this.state.storyId);
        let selectedText = story.content.substring(this.state.startIndex, this.state.endIndex);

        if(selectedText != '') {

          this.highlightText(this.state.storyId, this.state.startIndex, this.state.endIndex);

          this.setState({ 
            isFocused: false,
            selectedText: selectedText
          });

          this.props.fetchSemanticBodies(selectedText);
        }
      }
    }

    highlightText(storyId, startIndex, endIndex) {
          
        annotations = [];
        annotations.push({start: startIndex, end: endIndex});
    }

    createHiglightedText() {

      textContentPats = [];
      startIndex = 0;

      let diff = 0;
      this.getContent().story_items
        .filter(i => i.type === 'text')
        .forEach((content, index, arr) => {

          if(content.id == this.state.storyId) {

            for(let i = 0; i < index; i++) {

              diff += arr[i].content.length + 2;
            }
          }
        });


      let textVal = this.getContent().story_items
        .filter(i => i.type === 'text')
        .map(s => s.content)
        .reduce((acc, curr) => {return acc + '\n\n' + curr;});

      annotations.forEach((annotation, counter) => {

        let preText = "";
        let annotationText = "";

        if(annotation.start + diff != 0)
          preText = textVal.substring(startIndex, annotation.start + diff);

        annotationText = textVal.substring(annotation.start + diff, annotation.end + diff);

        if(preText != "")
          textContentPats.push({isAnnotation: false, text: preText});

        if(annotationText != "") {
          textContentPats.push({isAnnotation: true, text: annotationText})
        }

        startIndex = annotation.end + diff;

        if(counter == annotations.length - 1)
          textContentPats.push({isAnnotation: false, text: textVal.substring(annotation.end + diff, textVal.length)})
      });

      return textContentPats;
    }        

    handleDropdownSelection(index, value) {

      if(index != -1 && index <= this.props.semanticBodyData.semanticBodies.results.bindings.length) {

        let selectedBody = this.props.semanticBodyData.semanticBodies.results.bindings[index]
        this.setState({
          selectedBody: selectedBody.thing.value
        })
      }
    }

    componentWillMount(nextProps) {

      if(this.props.isSuccessfull === false && this.nextProps.isSuccessfull === true)
        this.props.navigation.goBack();
    }

    componentWillReceiveProps(nextProps) {

      if(this.props.semanticBodyData.isFetchDone === false && nextProps.semanticBodyData.isFetchDone === true) {

        this.setState({
          isSpinnerShown: false,
          isDropdownDisabled: false
        });
      }

    }

    async createAnnotation() {

      if(this.state.selectedText != '' && this.state.selectedBody != '') {

        let annotation = AnnotationFactory.createAnnotation(AnnotationTypes.TextAnnotation);
        annotation.target = new TextTarget();
        annotation.body = this.state.selectedBody;

        let userName = await StorageHelper.get(constants.USERNAME);
        annotation.setProperty('creator', constants.API_URI + '/users/' + userName);
        annotation.setProperty('created', Date.now());
        annotation.setProperty('modified', Date.now());

        annotation.target.url = constants.API_URI + "/stories/" + this.state.storyId;
        annotation.target.start = this.state.startIndex;
        annotation.target.end = this.state.endIndex;
        annotation.body.value = this.state.selectedText;

        console.log(annotation.getObjectRepresentation());


      } else {

      }


    }

    render(){


      let semanticBodies = this.props.semanticBodyData.semanticBodies.results != null
        ? this.props.semanticBodyData.semanticBodies.results.bindings
          .map(i => (i.name.value + '  (' + i.type.value + ')'))
        : [];
      let content = this.getContent();

    	return(
        <View style={[style.zPage]}>

          {
            this.state.isSpinnerShown &&
            <View style={style.spinnerContainer}>
              <BallIndicator color={colors.spinnerColor} animationDuration={800} style={style.spinner} />
              <View style={style.spinnerDarkLayer}></View> 
            </View> 
          }

          {
            this.renderIf(
              this.state.isFocused,
              <View style={privateStyle.content}>
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
                            onSelectionChange={(event) => this.handleTextSelection(event, story)}>
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
              !this.state.isFocused,
              <View style={privateStyle.content}>
                <View style={{flex:1}}>
                  <Text style={[privateStyle.contentPresenter, privateStyle.contentView]}
                        onPress={()=> { this.setState({ isFocused: true })}}>
                        {
                          this.createHiglightedText().map((item, key) => {
                            return (
                              item.isAnnotation 
                              ? 
                              <Text key={key} 
                                style={{ backgroundColor: 'yellow' }}>
                                  {item.text}
                                </Text> 
                                : 
                                <Text key={key}>
                                    {item.text}
                                </Text>
                            );
                        })}
                  </Text>           
                </View> 
              </View> 
            )
          }

          {
            <View style={{flex:1}}>
              <TouchableHighlight style={privateStyle.button} onPress={()=> this.confirmTextSelection()}>
                <Text style={privateStyle.buttonText}> 
                  Approve Selection
                </Text>
              </TouchableHighlight>
            </View>
          }
            
            
          <View style={privateStyle.editorContainer}>

            <ModalDropdown options={semanticBodies}
              disabled={this.state.isDropdownEnabled}
              defaultValue="Please select body..."
              showsVerticalScrollIndicator={true}
              style={privateStyle.dropdown}
              textStyle={privateStyle.dropdownText}
              dropdownStyle={privateStyle.dropdownBody}
              dropdownTextStyle={privateStyle.dropdownTextStyle}
              onSelect={(idx, value) => this.handleDropdownSelection(idx, value)}/>
          </View>


          <View style={privateStyle.footer}>
            <TouchableHighlight style={privateStyle.button} 
              onPress={() =>  this.createAnnotation()}>
              <Text style={privateStyle.buttonText}> 
                Annotate
              </Text>
            </TouchableHighlight>
          </View>          
        </View>
		  )
    }

}

function mapStateToProps (state) {
  return {
    semanticBodyData: state.SemanticBodiesReducer,
    annotationData: state.SemanticAnnotationReducer,
    contents: state.HomeReducer.contents
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createSemanticAnnotation: (annotation) => dispatch(createSemanticAnnotation(annotation)),
    fetchSemanticBodies: (keyword) => dispatch(fetchSemanticBodies(keyword))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(CreateSemanticAnnotationScene);