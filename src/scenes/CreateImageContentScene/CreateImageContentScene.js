import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from '@style/main';
import { ZImageView, ZTextArea, ZButton, ZRichTextEditor, ZTextBox} from '@components/index';
import ReactNative from 'react-native';
import Dimensions from 'Dimensions';
import { createImageContent } from '@actions';
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


export class CreateImageContentScene extends Component {

    constructor(props) {
        super(props);
        this.state = { contentType: 'image', title: '', description: '', tags: '', d: '', m: '', y:'', location:{longitude: '', latitude: ''}, href:''}
        this._submitForm = this._submitForm.bind(this);
    }

    openSearchModal() {
      RNGooglePlaces.openPlacePickerModal({
        latitude: 41.0082376,
        longitude: 28.9783589,
        radius: 0.1
      })
      .then((place) => {
        console.log(place);
        this.state.location.longitude = place.longitude;
        this.state.location.latitude = place.latitude;
      })
      .catch(error => console.log(error.message));  // error is a Javascript Error object
    }

    render(){

      console.log('in imagecontentcreatescene');

      let imageContentFields = {
        contentType: '',
        title: '',
        description: '',
        tags: '',
        date: '',
        location: '',
        creator: ''
      }
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
          <View style={styles.componentContainer}>
            <ZTextBox placeHolder=" Image URL "
                  placeholderTextColor="#9B51E0"
                  style={styles.textInput}
                  autoCapitalize="none"
                  value = {this.state.href}
                  onChangeText={(href) => this.setState({href})}/>
          </View>
          <View style={styles.componentContainer}>
            <ZTextBox placeHolder=" Your Story... "
                  placeholderTextColor="#9B51E0"
                  style={styles.textEditor}
                  multiline={true}
                  blurOnSubmit={false}
                  autoCapitalize="none"
                  value = {this.state.description}
                  onChangeText={(description) => this.setState({description})}/>
          </View>
        </View>
        <View style={styles.buttonSection}>
          <TouchableHighlight style={styles.createButton}>
            <Text style= {styles.searchText} onPress={() => this.openSearchModal()}> 
            Add Location </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.datePickerSection}>
          <Picker style={styles.datePickerDay}
            selectedValue={this.state.d}
            onValueChange={(itemValue, itemIndex) => { this.setState({d: itemValue})} }>
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
            selectedValue={this.state.m}
            onValueChange={(itemValue, itemIndex) => { this.setState({m: itemValue})} }>
            <Picker.Item label="Month" value="" />
            <Picker.Item label="January" value="January" />
            <Picker.Item label="February" value="February" />
            <Picker.Item label="March" value="March" />
            <Picker.Item label="April" value="April" />
            <Picker.Item label="May" value="May" />
            <Picker.Item label="June" value="June" />
            <Picker.Item label="July" value="July" />
            <Picker.Item label="August" value="August" />
            <Picker.Item label="September" value="September" />
            <Picker.Item label="October" value="October" />
            <Picker.Item label="November" value="November" />
            <Picker.Item label="December" value="December" />
          </Picker>
          <TextInput style={styles.datePickerYear}
            placeholder=" Year "
            placeholderTextColor="#9B51E0"
            value =  {this.state.y}
            onChangeText={(y) => this.setState({y})}
          />
        </View>
        <View style={styles.buttonSection}>
          <TouchableHighlight style={styles.createButton}>
            <Text style= {styles.searchText} onPress={() => { this._submitForm(); this.props.navigation.navigate('Home'); }}> 
            Create Content! </Text>
          </TouchableHighlight>
        </View>
        </ScrollView>
      </View>
      )
    }

    _submitForm() {
      imageContentFields.contentType = this.state.contentType;
      imageContentFields.title = this.state.title;
      imageContentFields.description = this.state.href;
      imageContentFields.tags = this.state.tags;
      imageContentFields.date = this.state.y +'-'+ this.state.m +'-'+ this.state.d;
      imageContentFields.location = this.state.location;
      imageContentFields.creator = constants.USERNAME;
      createImageContent(imageContentFields);
    };
}

const win = Dimensions.get('window');
const styles = StyleSheet.create({
  scene: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  formContainer:{
    flex:2, 
    alignItems:'center', 
    textAlign: 'left',
  },
  componentContainer:{
    marginBottom:16
  },
  textInput: {
    borderRadius: 0,
    width: win.width * 0.95,
    textAlign: 'left',
  },
  textEditor: {
    borderRadius: 0,
    width: win.width * 0.95,
    height: win.height * 0.5,
    textAlign: 'left',
  },
  editorContainer: {
    flex:2,
    width: win.width * 0.95,
    height: win.height * 0.5,
    marginTop:16,
    marginLeft: win.width * 0.025,
  },
  textSection: {
    flex: 0.1,
    backgroundColor: 'white',
    marginTop: 20,
  },
  datePickerSection: {
    flex: 0.1,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 20,
  },
  datePickerDay: {
    flex: 0.25,
  },
  datePickerMonth: {
    flex: 0.35,
  },
  datePickerYear: {
    flex: 0.4,
  },
  text: {
    color:'#9B51E0',
    textAlign:'center',
    height: 50,
  },
  formSection: {
    flex: 0.5,
    flexDirection: 'column',
    padding: 5,
  },
  scrollSection: {
    flex: 1,
    flexDirection: 'column',
  },
  createButton: {
    flex: 0.1,
    height: 30,
    backgroundColor:'#9B51E0',
    padding:5,
    borderRadius:50,
  },
  searchText: {
    color:'#fff',
    textAlign:'center',
  },
  formInput: {
    flex: 0.05,
    backgroundColor: 'white'
  },
  formInputBox: {
    flex: 0.2,
    backgroundColor: 'white',
    textAlignVertical: 'top'
  },
  buttonSection: {
    flex: 0.1,
    padding: 5,
  },
});

function mapStateToProps (state) {
  return {
    appData: state.CreateImageContentReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createImageContent: (imageContentFields) => dispatch(createImageContent(imageContentFields))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(CreateImageContentScene);