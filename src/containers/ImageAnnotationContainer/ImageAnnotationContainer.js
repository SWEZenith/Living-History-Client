import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from '@style/main';
import { ZImageView, ZTextArea, ZButton } from '@components/index';
import { View } from 'react-native';
import {createImageAnnotation} from '@actions';



export class ImageAnnotationContainer extends Component {

    constructor(props) {

        super(props);
    }

    render(){
    	return(
        <View style={[style.zPage]}>

          <View style={{flex:1}}>
            <ZImageView imageUrl="https://berlincon2016.symfony.com/bundles/sensiosymfonylive/images/berlincon2016/assets/postcard.jpg"/>
          </View>


          <View style={{flex:2}}>
            <ZTextArea placeHolder="Enter annotation content here."/>
            <ZButton text="Annotate" onPress={() => this.props.createImageAnnotation()}/>
          </View>


        </View>
		  )
    }

}


function mapStateToProps (state) {
  return {
    contentData: state.imageAnnotationReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createImageAnnotation: () => dispatch(createImageAnnotation())
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(ImageAnnotationContainer);