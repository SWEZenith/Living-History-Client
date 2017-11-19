import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from '@style/main';
import styles from './style';
import { ZImageView, ZTextArea, ZButton, ZRichTextEditor, ZTextBox} from '@components/index';
import ReactNative from 'react-native';
import { createContent } from '@actions';
import RNGooglePlaces from 'react-native-google-places';
import * as constants from '@utils/constants';
const {
  ScrollView,
  View,
  TextInput,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet,
  Picker,
} = ReactNative


export class CreateContentScene extends Component {

    constructor(props) {
        super(props);
        this.state = { 
          title: '', 
          tags: '', 
          day: '', 
          month: '', 
          year:'', 
          location: {
            longitude: '', 
            latitude: '', 
            name: 'Add Location' 
          },
          creator: constants.API_URI + "/users/" + constants.USERNAME, 
          text: '',
        }
    }

    openSearchModal() {

      RNGooglePlaces.openPlacePickerModal({
        latitude: 41.0082376,
        longitude: 28.9783589,
        radius: 0.1
      })
      .then((place) => {
        
        this.setState({location: {
          longitude: place.longitude,
          latitude: place.latitude,
          name: place.name
        }});
      })
      .catch(error => console.log(error.message));
    }

    createStoryItems(text) {

      const prefix = '<img src="';
      const postfix = '"/>';
      let prefixSeparated;
      let postfixSeparated = [];

      prefixSeparated = text.split(prefix);
      
      for(let part of prefixSeparated){
        for (let candidate of part.split(postfix)){
          if(candidate != "")
            postfixSeparated.push(candidate)
        }
      }

      let story_items = [];
      for(let storyItem of postfixSeparated){
        
        if(storyItem.indexOf("http") != -1)
          story_items.push({ type: 'image', content: storyItem});
        else
          story_items.push({ type: 'text', content: storyItem});
      }

      return story_items;
    }

    render(){

      let error = this.props.appData.error;
      let errText = error != undefined ? error.message != null ? error.message  : "" : "";

      return(
      <View style={styles.scene}>
        <ScrollView style={styles.scrollSection} >
        <View style={styles.textSection}>
          <Text style={styles.text}> Please fill in the following information then click the {"\n"}"Create Content!" button at the bottom. </Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.componentContainer}>
            <ZTextBox placeHolder=" Title "
                  placeholderTextColor="#9B51E0"
                  style={styles.textInput}
                  autoCapitalize="none"
                  value = {this.state.title}
                  onChangeText={(title) => this.setState({title})}/>
          </View>
          <View style={styles.componentContainer}>
            <ZTextBox placeHolder=" Tags (please use comma in between tags) "
                  placeholderTextColor="#9B51E0"
                  style={styles.textInput}
                  autoCapitalize="none"
                  value = {this.state.tags}
                  onChangeText={(tags) => this.setState({tags})}/>
          </View>
        </View>
        <View style={styles.editorContainer}>
          <ZRichTextEditor placeholder={'Enter annotation content here.'}
              onTextChange={(text) => this.setState({text})}/>
        </View>
        <View style={styles.buttonSection}>
          <TouchableHighlight style={styles.locationButton}>
            <Text style= {styles.text} onPress={() => this.openSearchModal()}> 
            {this.state.location.name} </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.datePickerSection}>
          <Picker style={styles.datePickerDay}
            selectedValue={this.state.day}
            onValueChange={(itemValue, itemIndex) => { this.setState({day: itemValue})} }>
            <Picker.Item label="Day" value="" />
            <Picker.Item label="01" value="01" />
            <Picker.Item label="02" value="02" />
            <Picker.Item label="03" value="03" />
            <Picker.Item label="04" value="04" />
            <Picker.Item label="05" value="05" />
            <Picker.Item label="06" value="06" />
            <Picker.Item label="07" value="07" />
            <Picker.Item label="08" value="08" />
            <Picker.Item label="09" value="09" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
            <Picker.Item label="13" value="13" />
            <Picker.Item label="14" value="14" />
            <Picker.Item label="15" value="15" />
            <Picker.Item label="16" value="16" />
            <Picker.Item label="17" value="17" />
            <Picker.Item label="18" value="18" />
            <Picker.Item label="19" value="19" />
            <Picker.Item label="20" value="20" />
            <Picker.Item label="21" value="21" />
            <Picker.Item label="22" value="22" />
            <Picker.Item label="23" value="23" />
            <Picker.Item label="24" value="24" />
            <Picker.Item label="25" value="25" />
            <Picker.Item label="26" value="26" />
            <Picker.Item label="27" value="27" />
            <Picker.Item label="28" value="28" />
            <Picker.Item label="29" value="29" />
            <Picker.Item label="30" value="30" />
            <Picker.Item label="31" value="31" />
          </Picker>
          <Picker style={styles.datePickerMonth}
            selectedValue={this.state.month}
            onValueChange={(itemValue, itemIndex) => { this.setState({month: itemValue})} }>
            <Picker.Item label="Month" value="" />
            <Picker.Item label="January" value="1" />
            <Picker.Item label="February" value="2" />
            <Picker.Item label="March" value="3" />
            <Picker.Item label="April" value="4" />
            <Picker.Item label="May" value="5" />
            <Picker.Item label="June" value="6" />
            <Picker.Item label="July" value="7" />
            <Picker.Item label="August" value="8" />
            <Picker.Item label="September" value="9" />
            <Picker.Item label="October" value="10" />
            <Picker.Item label="November" value="11" />
            <Picker.Item label="December" value="12" />
          </Picker>
          <TextInput style={styles.datePickerYear}
            placeholder=" Year "
            keyboardType="numeric"
            placeholderTextColor="#9B51E0"
            value =  {this.state.year}
            onChangeText={(year) => this.setState({year})}
          />
        </View>
        <View style={styles.buttonSection}>
          <TouchableHighlight style={styles.createButton}>
            <Text style= {styles.searchText} 
            onPress={() => { this._submitForm();  }}> 
            Create Content! </Text>
          </TouchableHighlight>
        </View>
        </ScrollView>
      </View>
      )
    }

    _submitForm() {

      let state = Object.assign({},this.state);
      
      let content = {};
      content.creator = state.creator;

      if(state.title != '')
        content['title'] = state.title;

      if(state.tags != '')
        content['tags'] = state.tags.split(',');

      if(state.day != '')
        content['day'] = state.day;

      if(state.month != '')
        content['month'] = state.month;

      if(state.year != '')
        content['year'] = state.year;

      if(state.location.latitude != '' || state.location.longitude != '' || state.location.name !='Add Location')
        content['location'] = state.location;

      if(state.text != '')
        content['story_items'] = this.createStoryItems(state.text);

      this.props.createContent(content)
      this.props.navigation.navigate('Home');
    };
}



function mapStateToProps (state) {
  return {
    appData: state.ContentReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createContent: (content) => dispatch(createContent(content))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(CreateContentScene);