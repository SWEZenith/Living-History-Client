import React, { Component } from 'react';
import { connect } from 'react-redux';
import { style } from '@style/main';
import privateStyle from '../ContentDetailScene/style';
import { ZImageView, ZButton } from '@components/index';
import { FlatList, Text, TouchableHighlight, View, Image, ScrollView, Button } from 'react-native';
import { fetchAnnotations } from '@actions';
//import Accordion from 'react-native-collapsible/Accordion';
import HTMLView from 'react-native-htmlview';



export class AnnotationDetailScene extends Component {

    constructor(props) {
        super(props);

        this.state = {
          containerWidth:0,
          containerWidth:0,
          isAnnotationShown: false,
          showAnnotationButtonCaption: 'Show annotations',

          imageAnnotationValues: {
            x: 0,
            y: 0,
            w: 0,
            h: 0
          }
        }
        
        this.createTextAnnotationRepresentations = this.createTextAnnotationRepresentations.bind(this);
    }

    calculateContentContainerSize(...params){
      
      this.setState({ 
        containerWidth: params[0].width,
        containerHeight: params[0].height 
      }) 
    }

    renderIf(condition, content){
      
      return condition ? content : null;
    }
    
    getContent() {
      
      return this.props.contents.find(content => content.id === this.props.navigation.state.params.contentId);
    }

    getAnnotation(){

      let content = this.getContent();
      let idToFind = this.props.navigation.state.params.annotationId;
      let result;

      for(let annotation of content.annotations) {

        if(annotation.id == idToFind) {
          result = annotation;
          break;
        }
      }

      return result;
    }

    highlightAnnotationOnContent() {

      let annotation = this.getAnnotation();
      this.setState({
        activeAnnotationId: annotation.id
      });
    }

    componentDidMount(){
      
      this.highlightAnnotationOnContent();
    }

    componentDidUpdate(){

      if(this.state.containerWidth == 0) {

        let annotation = this.getAnnotation();
        let separation = annotation.target.id.split('/');
        let storyId = separation[separation.length - 1].split('#')[0];
        let story = this.getContent().story_items.find(story_item => story_item.id == storyId);

        this.calculateImageAnnotationSizeValues(story.content, annotation);
      }
    }

    createTextAnnotationRepresentations(story){

      let annotations = this.getContent().annotations.filter(a => a.target.id.indexOf(story.id) != -1);
      let result;

      for(let annotation of annotations) {

        let positions = annotation.target.id.split('=')[1].split(',');

        result = (
          <Text>
            <Text>
              {story.content.substring(0, positions[0])}
            </Text>
            <Text style={{backgroundColor: this.state.activeAnnotationId == annotation.id ? "yellow" : "white"}}>
              {story.content.substring(positions[0], positions[1])}
            </Text>
            <Text>
              {story.content.substring(positions[1], story.content.length)}
            </Text>
          </Text>
        );
      }

      return result;
    }

    calculateImageAnnotationSizeValues(imageUrl, annotation) {

      if(annotation.target.id.indexOf('xywh') == -1)
        return;

      Image.getSize(imageUrl, async (actualWidth, actualHeight) => {
        
        let values = annotation.target.id.split('=')[1].split(',');
        let x = ((this.state.containerWidth * parseInt(values[0])) / actualWidth);
        let y = ((this.state.containerHeight * parseInt(values[1])) / actualHeight) + parseInt(values[2]);
        let w = parseInt(values[2]);
        let h = parseInt(values[3]);

        this.setState({
          imageAnnotationValues: {
            x: x, y: y, w: w, h: h
          }
        })
      })
    }

    render(){

      let content = this.getContent();
      let annotation = this.getAnnotation();

      return(
        <View style={[style.zPage]}>

          <View style={privateStyle.content} 
                onLayout={(event) => { this.calculateContentContainerSize(event.nativeEvent.layout) }}>
            <ScrollView style={privateStyle.contentBody}>
            {
              content.story_items.map((story) => {

                if(story.type === 'image'){

                  return(
                    <Image key={story.id} style={privateStyle.imageContent} 
                      source={{uri: story.content}}
                      style={{ width: this.state.containerWidth, height: this.state.containerHeight }}>

                      {
                        content.annotations.map((annotation) =>
                        {
                          if(annotation.target.id.indexOf(story.id) != -1) {

                            return(
                              <View key={annotation.id}
                                pointerEvents='none'
                                style={[privateStyle.areaSelector,{
                                  marginLeft: this.state.imageAnnotationValues.x,
                                  marginTop: this.state.imageAnnotationValues.y,
                                  width: this.state.imageAnnotationValues.w,
                                  height: this.state.imageAnnotationValues.h,
                                  opacity: this.state.activeAnnotationId == annotation.id ? 1 : 0
                                }]}
                              />
                            )
                          }
                        })
                      }

                    </Image>
                  )

                } else if(story.type === 'text') {

                  return(
                    <Text key={story.id} style={privateStyle.textContent}>
                      {this.createTextAnnotationRepresentations(story)}
                    </Text>
                  )
                }

              })
            }
            </ScrollView>
          </View>

          {
            <View style={privateStyle.annotationSection}>
              <View style={privateStyle.annotationContainer}>
              <ScrollView style={privateStyle.contentBody}>
                <HTMLView
                  value={annotation.body.value}
                />
                </ScrollView>
              </View>
            </View>
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
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(AnnotationDetailScene);