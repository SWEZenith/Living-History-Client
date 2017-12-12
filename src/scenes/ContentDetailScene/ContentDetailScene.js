import React, { Component } from 'react';
import { connect } from 'react-redux';
import { colors, style } from '@style/main';
import privateStyle from './style';
import { ZImageView, ZButton } from '@components/index';
import { FlatList, Text, TouchableHighlight, View, Image, ScrollView  } from 'react-native';
import { fetchAnnotations } from '@actions';
import HTMLView from 'react-native-htmlview';
import MapView from 'react-native-maps';



export class ContentDetailScene extends Component {

    constructor(props) {
        super(props);

        this.state = {
          containerWidth:0,
          containerWidth:0,
          isAnnotationShown: false,
          showAnnotationButtonCaption: 'Show annotations'
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

    changeAnnotationVisibility(){

      this.setState({
        isAnnotationShown: !this.state.isAnnotationShown,
        showAnnotationButtonCaption: this.state.showAnnotationButtonCaption == 'Show annotations'
                                      ? 'Show details' : 'Show annotations'
      })
    }

    getContent() {
      
      return this.props.contents.find(content => content.id === this.props.navigation.state.params.contentId);
    }

    handleAnnotationSelection(annotation) {

      this.props.navigation.navigate('AnnotationDetail', {
        annotationId: annotation.id,
        contentId: this.props.navigation.state.params.contentId
      })
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
                      content.tags.map((tag, index) => {
                        if(index < 5) {
                          return (
                            <Text key={tag} style={privateStyle.tag}>
                              {tag}
                            </Text>
                          )
                        }
                      })
                    }
                  </View>
                }

                {
                  this.renderIf((content.day || content.month || content.year),
                    <View style={privateStyle.dateContainer}>
                      <Text style={privateStyle.date}>{content.day}</Text>
                      { 
                        this.renderIf(content.day != '' && content.month != '', 
                          <Text style={privateStyle.date}>.</Text>
                        )
                      }
                      <Text style={privateStyle.date}>{content.month}</Text>
                      {
                        this.renderIf(content.month != '' && content.year != '',
                          <Text style={privateStyle.date}>.</Text>
                        ) 
                      }
                      <Text style={privateStyle.date}>{content.year}</Text>
                    </View>
                  )
                }

                {
                  this.renderIf((content.location.latitude && content.location.longitude),
                    <View style={privateStyle.mapContainer}>
                      <MapView
                        style={privateStyle.map}
                        initialRegion={{
                          latitude: content.location.latitude,
                          longitude: content.location.longitude,
                          latitudeDelta: 0.0270,
                          longitudeDelta: 0.0120,
                      }}>
                        <MapView.Marker
                          coordinate={{
                            latitude: content.location.latitude,
                            longitude: content.location.longitude,
                          }}
                          title={content.location.name}
                          description={content.title}
                          pinColor={colors.mainColor}
                        />
                      </MapView>
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

          {
            this.renderIf(
              (content.annotations.length > 0 && this.state.isAnnotationShown),
              <View style={privateStyle.annotationSection}>
                <View style={privateStyle.annotationContainer}>
                  <FlatList
                    data={content.annotations}
                    keyExtractor={(item, index) => item.id}
                    renderItem={ ({item}) => 
                      <View>
                        <TouchableHighlight style={privateStyle.annotationItem}
                          onPress={()=> this.handleAnnotationSelection(item)}>
                          <Text numberOfLines={1}>
                            {item.body.value}
                          </Text>
                        </TouchableHighlight>
                      </View> 
                    }
                  />
                </View>
              </View>
            )
          }

          <View style={privateStyle.footer}>
            <View style={{flex:1, marginBottom:10}}>
                <TouchableHighlight style={privateStyle.button} onPress={()=> this.changeAnnotationVisibility()}>
                  <Text style={privateStyle.buttonText}> 
                    {this.state.showAnnotationButtonCaption}
                  </Text>
                </TouchableHighlight>
             </View>
             {
                this.renderIf(
                  !this.state.isAnnotationShown,
                  <View style={{flex:1, marginBottom:10}}>
                    <TouchableHighlight style={privateStyle.button}
                      onPress={() =>  this.props.navigation.navigate('CreateAnnotation', { contentId: content.id })}>
                        <Text style={privateStyle.buttonText}> 
                          Create Annotation
                        </Text>
                      </TouchableHighlight>
                  </View>
                )
              }
              {
                this.renderIf(
                  !this.state.isAnnotationShown,
                  <View style={{flex:1, marginBottom:10}}>
                    <TouchableHighlight style={privateStyle.button} 
                      onPress={() =>  this.props.navigation.navigate('CreateSemanticAnnotation', { contentId: content.id })}>
                      <Text style={privateStyle.buttonText}> 
                        Create Semantic Annotation
                      </Text>
                    </TouchableHighlight>
                  </View>
                )
              }
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