import React, { Component } from 'react';
import { connect } from 'react-redux';
import { style } from '@style/main';
import privateStyle from './style';
import { ZImageView, ZButton } from '@components/index';
import { FlatList, Text, TouchableHighlight, View, Image, ScrollView } from 'react-native';
import { fetchAnnotations } from '@actions';



export class ContentDetailScene extends Component {

    constructor(props) {
        super(props);

        this.state = {
          containerWidth:0,
          containerWidth:0
        }
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

    render(){

      let content = this.props.contents.find(content => content.id === this.props.navigation.state.params.contentId);
    	return(
        <View style={[style.zPage]}>

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
                    </Image>
                  )

                } else if(story.type === 'text') {

                  return(
                    <Text key={story.id} style={privateStyle.textContent}>
                      {story.content}
                    </Text>
                  )
                }

              })
            }
            </ScrollView>
          </View>





          <View style={{flex:1, alignItems:'center'}}>
            <ZButton text="Annotate" 
              onPress={() => 
                this.props.navigation.navigate(
                  'CreateAnnotation', 
                  { contentId: content.id })
              }/>
          </View>

          <View style={privateStyle.annotationSection}>
            <View style={privateStyle.annotationContainer}>
                <FlatList
                  data={content.annotations}
                  keyExtractor={(annotation, index) => annotation.id}
                  renderItem={ ({item}) =>
                    <TouchableHighlight onPress={() => {
                        this.props.navigation.navigate(
                          'AnnotationDetail', 
                          { annotationId: item.id }
                        )
                      }
                    }>
                      <View style={privateStyle.annotationItem}>
                        <Text>{item.body.value}</Text>
                      </View> 
                    </TouchableHighlight>
                  }
                />
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
    fetchAnnotations: (contentId) => dispatch(fetchAnnotations(contentId))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(ContentDetailScene);