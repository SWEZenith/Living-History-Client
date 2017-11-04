import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from '@style/main';
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
      <View style={styles.scene}>
        <View style={styles.searchSection}>
          <TextInput style={styles.searchInput}
            returnKeyType="search"
            placeholder=" Browse Memories... "
            onChangeText={(searchInput) => this.setState({searchInput})}
            value={this.state.searchInput}
          />
          <TouchableHighlight style={styles.searchButton}>
            <Text style= {styles.searchText}>Search</Text>
          </TouchableHighlight>
        </View>
        <ScrollView style={styles.scrollSection} >
          {content_array.map((content) => {
            return <TouchableHighlight key={content.key} style={styles.resultButton} onPress={ 
              () => this.props.navigation.navigate('ImageContent', { href: content.href }) }>
            <View>
              <Image source={ { uri: content.href } } style={styles.resultImage} />
              <Text style={ styles.resultText } >{content.title}</Text>
            </View>
          </TouchableHighlight>
          })}
        </ScrollView>
        <View style={styles.searchSection}>
          <TouchableHighlight style={styles.createButton} onPress={() => this.props.navigation.navigate('CreateImageContent')}>
            <Text style= {styles.searchText}> Create Content! </Text>
          </TouchableHighlight>
        </View>
      </View>
		  )
    }

}


const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchSection: {
    height: 40,
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 5,
  },
  scrollSection: {
    flex: 0.8
  },
  searchButton: {
    flex: 0.12,
    height: 30,
    backgroundColor:'#eb5758',
    padding:5,
    borderRadius:50,
  },
  createButton: {
    flex: 1,
    height: 30,
    backgroundColor:'#eb5758',
    padding:5,
    borderRadius:50,
  },
  searchText: {
    color:'#fff',
    textAlign:'center',
  },
  resultButton: {
    flex: 0.3,
  },
  searchInput: {
    flex: 0.88,
    height: 40,
    backgroundColor: 'white'
  },
  resultText: {
    backgroundColor: '#000',
    color: '#FFF',
    height: 20,
  },
  resultImage: {
    height: 150,
  },
});

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
