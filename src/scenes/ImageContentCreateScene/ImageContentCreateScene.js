import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from '@style/main';
import { ZImageView, ZTextArea, ZButton } from '@components/index';
import ReactNative from 'react-native';
import { createImageAnnotation } from '@actions';
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
  Picker,
} = ReactNative


export class ImageContentCreateScene extends Component {

    constructor(props) {
        super(props);
        this.state = { title: '', description: '', tags: '', d: '', m: '', y: '', location: '', href: '' }
    }

    render(){
      return(
      <View style={styles.scene}>
        <ScrollView style={styles.scrollSection} >
        <View style={styles.textSection}>
          <Text style={styles.text}> Please fill in the following information then click the {"\n"}"Create Content!" button at the bottom. </Text>
        </View>
        <View style={styles.formSection}>
          <TextInput style={styles.formInput}
            placeholder=" Title "
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
          />
          <TextInput style={styles.formInput}
            placeholder=" Tags (please use comma in between tags) "
            onChangeText={(tags) => this.setState({tags})}
            value={this.state.tags}
          />
          <TextInput style={styles.formInputBox}
            placeholder=" Decription "
            multiline={true}
            numberOfLines = {10}
            onChangeText={(description) => this.setState({description})}
            maxLength = {490}
            blurOnSubmit={false}
            value={this.state.description}
          />
          <TextInput style={styles.formInput}
            placeholder=" Image URL "
            onChangeText={(href) => this.setState({href})}
            value={this.state.href}
          />
          <TextInput style={styles.formInput}
            placeholder=" Location "
            onChangeText={(location) => this.setState({location})}
            value={this.state.location}
          />
        </View>
        <View style={styles.datePickerSection}>
          <Picker style={styles.datePicker}
            selectedValue={this.state.d}
            onValueChange={(itemValue, itemIndex) => this.setState({d: itemValue})}>
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
          <Picker style={styles.datePicker}
            selectedValue={this.state.m}
            onValueChange={(itemValue, itemIndex) => this.setState({m: itemValue})}>
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
            onChangeText={(z) => this.setState({z})}
            value={this.state.z}
          />
        </View>
        <View style={styles.buttonSection}>
          <TouchableHighlight style={styles.createButton}>
            <Text style= {styles.searchText}> Create Content! </Text>
          </TouchableHighlight>
        </View>
        </ScrollView>
      </View>
      )
    }

}


const styles = StyleSheet.create({
  scene: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'space-between',
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
  datePicker: {
    flex: 0.3,
  },
  datePickerYear: {
    flex: 0.4,
  },
  text: {
    color:'black',
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
    backgroundColor:'#eb5758',
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
    title: state.imageContentTitle,
    description: state.imageContentDescription,
    tags: state.imageContentTags,
    d: state.imageContentD,
    m: state.imageContentM,
    y: state.imageContentY,
    location: state.imageContentLocation,
    href: state.imageContentHref,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createImageContent: (imageContent) => dispatch(createImageContent(imageContent))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(ImageContentCreateScene);