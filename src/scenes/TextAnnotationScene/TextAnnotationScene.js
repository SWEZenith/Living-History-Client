import React, { Component } from 'react';
import { connect } from 'react-redux';
import { style } from '@style/main';
import privateStyle from './style';
import { View, Text, TextInput } from 'react-native';
import { ZButton, ZRichTextEditor } from '@components';
import { createTextAnnotation } from '@actions';
import { AnnotationFactory } from '@common';
import { AnnotationTypes } from '@enums';
import { TextTarget, BaseAnnotationBody } from '@models';



let textContentPats = [];
let annotations = [];
let startIndex = 0;



export class TextAnnotationScene extends Component {

    static navigationOptions = { header: <Text style={{ display:"none" }} ></Text> };

    /**
     *  Ctor.
     */
    constructor(props) {
      
      super(props);


      let annotation = AnnotationFactory.createAnnotation(AnnotationTypes.TextAnnotation);
      annotation.target = new TextTarget();
      annotation.body = new BaseAnnotationBody();
      // BRK Delete
      annotation.target.url = 'http://brk.com';
      //BRK Delete


      this.state = {
        textVal: `Raskolnikov is the protagonist of the novel, and the story is told almost exclusively from his point of view. His name derives from the Russian word raskolnik, meaning “schismatic” or “divided,” which is appropriate since his most fundamental character trait is his alienation from human society.`,
        isFocused: true,
        annotation: annotation
      };
    }

    componentWillMount(nextProps) {
      
      if(this.props.isSuccessfull === false && this.nextProps.isSuccessfull === true)
        this.props.navigation.goBack();
    }

    handleEditorTextChange(text) {

      this.state.annotation.body.value = text;
      
      if(this.state.isFocused == true)
        this.setState({ isFocused: false })
    }

    handleAnnotationSelection(event) {

      let annotation = this.state.annotation;
      annotation.target.start = event.nativeEvent.selection.start;
      annotation.target.end = event.nativeEvent.selection.end;
      this.setState({annotation: annotation});

      this.highlightText(annotation.target.start, annotation.target.end);
    }

    highlightText(startIndex, endIndex) {

        if(this.state.textVal != null && this.state.textVal != '') {
          
          annotations = [];
          annotations.push({start: startIndex, end: endIndex});
        }
    }


    createHiglightedText() {

      textContentPats = [];
      startIndex = 0;

      annotations.forEach((annotation, counter) => {

        let preText = "";
        let annotationText = "";

        if(annotation.start != 0)
          preText = this.state.textVal.substring(startIndex, annotation.start);

        annotationText = this.state.textVal.substring(annotation.start, annotation.end);

        if(preText != "")
          textContentPats.push({isAnnotation: false, text: preText});

        if(annotationText != "") {
          textContentPats.push({isAnnotation: true, text: annotationText})
        }

        startIndex = annotation.end;

        if(counter == annotations.length - 1)
          textContentPats.push({isAnnotation: false, text: this.state.textVal.substring(annotation.end, this.state.textVal.length)})
      });

      return textContentPats;
    }

    render(){

      const { navigate } = this.props.navigation;


    	return(
        <View style={[style.zPage]}>
          <View style={privateStyle.pageContainer}>
              

            <View style={privateStyle.contentContainer}>
             {
                this.state.isFocused 
                ?
                <TextInput
                    onPress={()=> { this.setState({ isFocused: false })}}
                    style={privateStyle.contentPresenter}
                    multiline={true}
                    autoFocus={true}
                    editable={false}
                    value={this.state.textVal}
                    onSelectionChange={(event) => this.handleAnnotationSelection(event)}/>
                :
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
                              <Text key={key}
                                selectable="true">
                                  {item.text}
                              </Text>
                          );
                      })}
                </Text>
              }
            </View>


            <View style={privateStyle.editorContainer}>
                <ZRichTextEditor placeholder={'Enter annotation content here.'}
                  onTextChange={(text)=> this.handleEditorTextChange(text)}/>
            </View>

            <View style={privateStyle.footer}>
              <ZButton text="Annotate"
                  onPress={() => this.props.createTextAnnotation(this.state.annotation)}/>
            </View>

          </View>
        </View>
		  )
    }

}

function mapStateToProps (state) {
  return {
    appData: state.TextAnnotationReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createTextAnnotation: (textAnnotation) => dispatch(createTextAnnotation(textAnnotation))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(TextAnnotationScene);