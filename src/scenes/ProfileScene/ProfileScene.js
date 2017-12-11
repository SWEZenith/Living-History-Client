import React, { Component } from 'react';
import { connect } from 'react-redux';
import privateStyle from './style';
import ReactNative from 'react-native';
import { fetchUserContents, fetchUserAnnotations } from '@actions';

const {
  ScrollView,
  View,
  Image,
  Text,
  TouchableHighlight,
  FlatList,
} = ReactNative;

export class ProfileScene extends Component {

    componentDidMount() {
      this.props.fetchUserContents();
      this.props.fetchUserAnnotations();
    }

    render() {
      
      const contents = this.props.appData.userContents;
      const annotations = this.props.appData.userAnnotations;
      //console.log(contents.find(content => content.id === '5a146ebffc2199000146cd7f'));
      //console.log(annotations.find(content => content.id === '5a11dd5cfc2199000146c922'));
      
      return(
      <View style={privateStyle.scene}>

      <View style={privateStyle.headerStyle}>
        <Text> User Profile </Text>
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
                    onPress={()=> alert(item.body.value)}>
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
    appData: state.ProfileReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUserContents: () => dispatch(fetchUserContents()),
    fetchUserAnnotations: () => dispatch(fetchUserAnnotations())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScene);
