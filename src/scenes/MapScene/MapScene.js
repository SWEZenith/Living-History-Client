import React, { Component } from 'react';
import { connect } from 'react-redux';
import { colors, style } from '@style/main';
import privateStyle from './style';
import { ZImageView, ZTextArea, ZButton, ZTextBox } from '@components/index';
import ReactNative from 'react-native';
import { fetchContents } from '@actions';
import { AnnotationFactory } from '@common';
import { AnnotationTypes } from '@enums';
import { ImageTarget, BaseAnnotationBody } from '@models';
import { searchContent } from '@actions';
import MapView from 'react-native-maps';


const {
  ScrollView,
  View,
  TextInput,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet,
  RefreshControl,
  Keyboard,
  Alert
} = ReactNative

export class MapScene extends Component {

    constructor(props) {
        super(props);
        this.state = { searching: false, searchInput: '', refreshing: false}
    }
    
    componentDidMount(){

      this.props.fetchContents();
    }  

    render(){
      
      let contents = this.props.appData.contents;

    	return(
        <View style={privateStyle.mapContainer}>
          <MapView
            style={privateStyle.map}
            initialRegion={{
              latitude: 41.08416633,
              longitude: 29.053666452,
              latitudeDelta: 0.0810,
              longitudeDelta: 0.0360,
            }}>
              {contents.map(content => (
                (content.location != null && content.location.latitude != null && content.location.longitude != null) &&
                <MapView.Marker
                  key={content.location.latitude}
                  coordinate={{longitude: content.location.longitude, latitude: content.location.latitude}}
                  onPress={ () => this.props.navigation.navigate('ContentDetail', { contentId: content.id }) }
                  title={content.title}
                  description={content.location.name}
                  pinColor={colors.mainColor}
                />
              ))}         
          </MapView>
        </View>
		  )
    }

}

function mapStateToProps (state) {
  return {
    appData: state.HomeReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchContents: () => dispatch(fetchContents()),
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(MapScene);
