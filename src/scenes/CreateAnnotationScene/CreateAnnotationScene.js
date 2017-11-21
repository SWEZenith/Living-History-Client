import React, { Component } from 'react';
import { connect } from 'react-redux';
import { style } from '@style/main';
import privateStyle from './style';
import { ZImageView, ZTextArea, ZButton, ZRichTextEditor } from '@components/index';
import { View, Dimensions, Image, Text, ScrollView, TouchableHighlight } from 'react-native';


export class CreateAnnotationScene extends Component {

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



    render(){

      let content = this.props.contents.find(content => content.id === this.props.navigation.state.params.contentId);

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