import React, { Component } from 'react';
import { connect } from 'react-redux';
import { style } from '@style/main';
import privateStyle from '../ContentDetailScene/style';
import { ZImageView, ZButton } from '@components/index';
import { FlatList, Text, TouchableHighlight, View, Image, ScrollView, Button } from 'react-native';
import { fetchAnnotations } from '@actions';
import Accordion from 'react-native-collapsible/Accordion';
import HTMLView from 'react-native-htmlview';



export class AnnotationDetailScene extends Component {

    constructor(props) {
        super(props);

        this.state = {
          containerWidth:0,
          containerWidth:0,
          isAnnotationShown: false,
          showAnnotationButtonCaption: 'Show annotations'
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

                            let values = annotation.target.id.split('=')[1].split(',');

                            return(
                              <View key={annotation.id}
                                pointerEvents='none'
                                style={[privateStyle.areaSelector,{
                                  marginLeft: parseInt(values[0]),
                                  marginTop: parseInt(values[1]),
                                  width: parseInt(values[2]),
                                  height: parseInt(values[3]),
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