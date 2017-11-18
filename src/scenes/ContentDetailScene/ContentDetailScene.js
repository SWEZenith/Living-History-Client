import React, { Component } from 'react';
import { connect } from 'react-redux';
import { style } from '@style/main';
import privateStyle from './style';
import { ZImageView, ZButton } from '@components/index';
import { View } from 'react-native';
import { FlatList, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { fetchAnnotations } from '@actions';



export class ContentDetailScene extends Component {

    constructor(props) {
        super(props);
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
              (content.day || content.month || content.year) &&
              <View style={privateStyle.dateContainer}>
                { content.day && <Text>{content.day}</Text> }
                { content.day && content.month && <Text>.</Text>}
                { content.month && <Text>{content.month}</Text> }
                { content.month && content.year && <Text>.</Text>}
                { content.year && <Text>{content.year}</Text> }
              </View>
            }
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