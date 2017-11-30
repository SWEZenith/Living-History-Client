import React, { Component } from 'react';
import { connect } from 'react-redux';
import privateStyle from './style';
import ReactNative from 'react-native';
import { fetchUserContents } from '@actions';
const {
  ScrollView,
  View,
  Image,
  Text,
  TouchableHighlight,
} = ReactNative;

export class ProfileScene extends Component {

    componentDidMount() {
      this.props.fetchUserContents();
    }

    render() {
      
      const contents = this.props.appData.userContents;
      const { headerStyle, containerStyle, itemStyle } = styles;
      
      return(
      <View style={privateStyle.scene}>

      <View style={headerStyle}>
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
                <ScrollView>
                  <Image source={{ uri: content.cover_image }} style={privateStyle.resultImage} />
                  <Text style={privateStyle.resultText} >{content.title}</Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </ScrollView>

        <ScrollView style={privateStyle.scrollSection}>
          {contents.map((content) => {
            return (
              <TouchableHighlight 
                  key={content.id} 
                  style={privateStyle.resultButton,{paddingLeft: 15}} 
                  onPress={() => this.props.navigation.navigate('ContentDetail', { contentId: content.id }) }>
                <View>
                  <Text style={privateStyle.resultText} >{content.title}</Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </ScrollView>
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
    fetchUserContents: () => dispatch(fetchUserContents())
  };
}

const styles = {
  headerStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    fontSize: 20
  },
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  },
  itemStyle: {
    paddingLeft: 15
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScene);
