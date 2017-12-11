import React, { Component } from 'react';
import { connect } from 'react-redux';
import privateStyle from './style';
import ReactNative from 'react-native';
import { fetchUserContents, fetchUserAnnotations } from '@actions';
import { StorageHelper } from '@utils';
import * as constants from '@utils/constants';

const {
  ScrollView,
  View,
  Image,
  Text,
  TouchableHighlight,
  FlatList,
} = ReactNative;

export class ProfileScene extends Component {

    state = {
      username: [],
    }

    async componentDidMount() {
      //this.loadInitialState().done();
      let username = await StorageHelper.get(constants.USERNAME);
      this.setState({ username: username });
      this.props.fetchUserContents(username);
      this.props.fetchUserAnnotations(username);
    }

    findContentId(annotationId) {
      for(let content of this.props.contents) {
        for(let annotation of content.annotations) {
          if(annotation.id == annotationId) {
            result = content.id;
            break;
          }
       }
      }
      return result;
    }

    handleAnnotationSelection(annotationId) {

      this.props.navigation.navigate('AnnotationDetail', {
        annotationId: annotationId,
        contentId: this.findContentId(annotationId)
      })
    }

    render() {
      
      const contents = this.props.appData.userContents;
      const annotations = this.props.appData.userAnnotations;

      return(
      <View style={privateStyle.scene}>

      <View style={privateStyle.headerStyle}>
        <Text> {this.state.username}'s Profile </Text>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 5 }} >
        <ScrollView style={privateStyle.scrollSection}>
          {contents.map((content) => {
            return (
              <TouchableHighlight 
                  key={content.id} 
                  style={privateStyle.resultButton,{paddingLeft: 15}} 
                  onPress={() => this.props.navigation.navigate('ContentDetail', { contentId: content.id }) }>
                <View>
                  <Image source={{ uri: content.cover_image }} style={privateStyle.resultImage} />
                  <Text style={privateStyle.resultText} >{content.title}</Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </ScrollView>

        <View style={{paddingLeft: 15}}/>

        <View style={privateStyle.annotationSection}>
          <View style={privateStyle.annotationContainer}>
            <FlatList
              data={annotations}
              keyExtractor={(item, index) => item.id}
              renderItem={ ({item}) => 
                <View>
                  <TouchableHighlight style={privateStyle.annotationItem}
                    onPress={()=> this.handleAnnotationSelection(item.id)}>
                    <Text style={{fontSize: 12}}>
                      {item.id}
                    </Text>
                  </TouchableHighlight>
                </View> 
              }
            />
          </View>
        </View>


      </View>

      </View>
      );
    }
}

function mapStateToProps(state) {
  return {
    appData: state.ProfileReducer,
    contents: state.HomeReducer.contents,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUserContents: (username) => dispatch(fetchUserContents(username)),
    fetchUserAnnotations: (username) => dispatch(fetchUserAnnotations(username)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileScene);
