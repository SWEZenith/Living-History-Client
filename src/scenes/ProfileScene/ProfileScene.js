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
                <View>
                  <Image source={{ uri: content.cover_image }} style={privateStyle.resultImage} />
                  <Text style={privateStyle.resultText} >{content.title}</Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </ScrollView>


        <View style={privateStyle.annotationSection}>
          <View style={privateStyle.annotationContainer}>
            <FlatList
              data={annotations}
              keyExtractor={(item, index) => item.id}
              renderItem={ ({item}) => 
                <View>
                  <TouchableHighlight style={privateStyle.annotationItem,{paddingLeft: 15}}
                    onPress={()=> alert(item.body.value)}>
                    <Text>
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
