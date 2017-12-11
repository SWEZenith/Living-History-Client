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


const {
  ScrollView,
  View,
  TextInput,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet,
  RefreshControl
} = ReactNative

export class HomeScene extends Component {


    constructor(props) {
        super(props);
        this.state = { searching: false, searchInput: '', refreshing: false }
        this._onRefresh = this._onRefresh.bind(this)
    }
    
    componentDidMount(){

      this.props.fetchContents();
    }

    _onRefresh() { 
      this.setState({refreshing: true}); 
      this.props.fetchContents();
      this.setState({refreshing: false}); 
    }

    handleSearch() {

      if(this.state.searchInput != '' || this.state.searchInput.trim() != '')
        this.props.searchContent(this.state.searchInput);
      
    }    

    render(){
      
      let contents = this.props.appData.contents;

    	return(
      <View style={privateStyle.scene}>

        <View style={privateStyle.searchSection}>

          <TextInput style={privateStyle.searchInput}
            returnKeyType="search"
            placeholder=" Browse Memories... "
            onChangeText={(searchInput) => this.setState({searchInput})}
            value={this.state.searchInput}
          />
                    
          <TouchableHighlight style={privateStyle.searchButton}
            onPress={()=> this.handleSearch()}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../../assets/img/icons/search.png')}
            />
          </TouchableHighlight>
          
        </View>

        <ScrollView style={privateStyle.scrollSection}
          refreshControl={ 
            <RefreshControl 
              refreshing={this.state.refreshing} 
              onRefresh={this._onRefresh} 
              colors={[colors.mainColor]}
              tintColor={colors.mainColor}
            /> 
          }>
          {contents.map((content) => {
            return (
              <TouchableHighlight key={content.id} 
                  style={privateStyle.resultButton} 
                  onPress={ () => this.props.navigation.navigate('ContentDetail', { contentId: content.id }) }>
                <View>
                  <Image source={ (content.cover_image == "" ? require('../../assets/img/city.png') : { uri: content.cover_image })} 
                    style={privateStyle.resultImage} />
                  <Text style={ privateStyle.resultText } >{content.title}</Text>
                </View>
              </TouchableHighlight>
            )
          })}
        </ScrollView>
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
    searchContent: (keyword) => dispatch(searchContent(keyword))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(HomeScene);
