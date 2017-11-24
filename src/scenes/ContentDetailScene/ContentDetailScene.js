import React, { Component } from 'react';
import { connect } from 'react-redux';
import { style } from '@style/main';
import privateStyle from './style';
import { ZImageView, ZButton } from '@components/index';
import { FlatList, Text, TouchableHighlight, View, Image, ScrollView, Button } from 'react-native';
import { fetchAnnotations } from '@actions';
import Accordion from 'react-native-collapsible/Accordion';
import HTMLView from 'react-native-htmlview';



export class ContentDetailScene extends Component {

    constructor(props) {
        super(props);

        this.state = {
          containerWidth:0,
          containerWidth:0,
          isAnnotationShown: false,
          showAnnotationButtonCaption: 'Show annotations',
          activeAnnotationId:''
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

    changeAnnotationVisibility(){

      this.setState({
        isAnnotationShown: !this.state.isAnnotationShown,
        showAnnotationButtonCaption: this.state.showAnnotationButtonCaption == 'Show annotations'
                                      ? 'Show details' : 'Show annotations'
      })
    }
    
    _renderHeader(item) {
      return (
        <View style={{borderBottomWidth:1, borderColor:'#9B51E0', height:30}} >
          <Text style={{fontSize:15}}>
            {item.id}
          </Text>
        </View>
      );
    }
  
    _renderContent(item) {
      return (
        <View>
          <HTMLView
            value={item.body.value}
            style={{minHeight:100, borderBottomWidth:1, borderColor:'#9B51E0'}}
          />
        </View>
      );
    }
  
    setActiveAnntationId(id){

      this.setState({ activeAnnotationId: id })
    }

    getContent() {
      
      return this.props.contents.find(content => content.id === this.props.navigation.state.params.contentId);
    }

    handleAnnotationSelection(index) {

      let id;

      if(index === false) {
        
        id = '';

      } else {

        let content = this.getContent();
        id = content.annotations[index].id;
      }

      this.setActiveAnntationId(id);
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

    	return(
        <View style={[style.zPage]}>

          {
            this.renderIf(
              !this.state.isAnnotationShown,
              <View style={privateStyle.propertyContainer}>
                {
                  content.title &&
                  <View style={privateStyle.titleContainer}>
                    <Text style={privateStyle.title}>
                      {content.title}
                    </Text>
                  </View>
                }

                {
                  content.tags.length > 0 &&
                  <View style={privateStyle.tagContainer}>
                    {
                      content.tags.map((tag) => {
                        return (
                          <Text key={tag} style={privateStyle.tag}>
                            {tag}
                          </Text>
                        )
                      })
                    }
                  </View>
                }

                {
                  this.renderIf((content.day || content.month || content.year),
                    <View style={privateStyle.dateContainer}>
                      { content.day && <Text>{content.day}</Text> }
                      { content.day && content.month && <Text>.</Text>}
                      { content.month && <Text>{content.month}</Text> }
                      { content.month && content.year && <Text>.</Text>}
                      { content.year && <Text>{content.year}</Text> }
                    </View>
                  )
                }
              </View>
            )
          }

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
            this.renderIf(
              (content.annotations.length > 0 && this.state.isAnnotationShown),
              <View style={privateStyle.annotationSection}>
                <View style={privateStyle.annotationContainer}>
                  <Accordion 
                    sections={content.annotations}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    onChange={this.handleAnnotationSelection.bind(this)}
                  />
                </View>
              </View>
            )
          }

          <View style={privateStyle.footer}>
            <View style={privateStyle.footerLeftContainer}>
                <TouchableHighlight style={privateStyle.button} onPress={()=> this.changeAnnotationVisibility()}>
                  <Text style={privateStyle.buttonText}> 
                    {this.state.showAnnotationButtonCaption}
                  </Text>
                </TouchableHighlight>
             </View>
             <View style={privateStyle.footerRightContainer}>
                <TouchableHighlight style={privateStyle.button}
                onPress={() =>  this.props.navigation.navigate('CreateAnnotation', { contentId: content.id })}>
                  <Text style={privateStyle.buttonText}> 
                    Create Annotation
                  </Text>
                </TouchableHighlight>
             </View>
          </View>

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

export default connect( mapStateToProps, mapDispatchToProps)(ContentDetailScene);