import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from '@style/main';
import privateStyle from './style';
import { ZImageView, ZTextArea, ZButton } from '@components/index';
import ReactNative from 'react-native';
import { fetchContents } from '@actions';
import { AnnotationFactory } from '@common';
import { AnnotationTypes } from '@enums';
import { ImageTarget, BaseAnnotationBody } from '@models';
const {
  ScrollView,
  View,
  TextInput,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet,
} = ReactNative



export class HomeScene extends Component {

    constructor(props) {
        super(props);
        this.state = { searching: false, searchInput: '' }
    }

    render(){
      
      // BRK DELETE
      let contentUri = 'https://berlincon2016.symfony.com/bundles/sensiosymfonylive/images/berlincon2016/assets/postcard.jpg';
      let contentUri2 = 'http://en.istanbul.com/Files/Content/bebek-istanbul.JPG';
      let contentUri3 = 'http://cdn.yemek.com/mncrop/940/625/uploads/2014/11/boza-tarifi.jpg';
      let contentUri4 = 'http://eslidanslar.metu.edu.tr/system/files/1779693_10152320102595432_757168409_n.jpg';
      let contentUri5 = 'https://cdn1.nenerede.com.tr/wp-content/uploads/2017/04/%C4%B0zmir-Fen-Lisesi.jpg';
      let contentUri6 = 'https://media.licdn.com/mpr/mpr/shrinknp_674_240/p/2/005/02c/392/2295ca5.jpg';
      // BRK DELETE

      var content_array = [
      {
        key: 1,
        href: contentUri,
        title: 'Berlin',
      },
      {
        key: 2,
        href: contentUri2,
        title: 'Bebek',
      },
      {
        key: 3,
        href: contentUri3,
        title: 'Boza',
      },
      {
        key: 4,
        href: contentUri4,
        title: 'ODTÜ',
      },
      {
        key: 5,
        href: contentUri5,
        title: 'İzmir Fen Lisesi',
      },
      {
        key: 6,
        href: contentUri6,
        title: 'Boğaziçi Üniversitesi',
      }];

    	return(
      <View style={privateStyle.scene}>
        <View style={privateStyle.searchSection}>
          <TextInput style={privateStyle.searchInput}
            returnKeyType="search"
            placeholder=" Browse Memories... "
            onChangeText={(searchInput) => this.setState({searchInput})}
            value={this.state.searchInput}
          />
          <TouchableHighlight style={privateStyle.searchButton}>
            <Text style= {privateStyle.searchText}>Search</Text>
          </TouchableHighlight>
        </View>
        <ScrollView style={privateStyle.scrollSection} >
          {content_array.map((content) => {
            return <TouchableHighlight key={content.key} style={privateStyle.resultButton} onPress={ 
              () => this.props.navigation.navigate('ImageContent', { href: content.href }) }>
            <View>
              <Image source={ { uri: content.href } } style={privateStyle.resultImage} />
              <Text style={ privateStyle.resultText } >{content.title}</Text>
            </View>
          </TouchableHighlight>
          })}
        </ScrollView>
      </View>
		  )
    }

}

function mapStateToProps (state) {
  return {
    searchInput: state.searchInput
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchContents: (contentId) => dispatch(fetchContents(contentId))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(HomeScene);
