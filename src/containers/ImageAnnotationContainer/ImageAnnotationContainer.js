import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from '@style/main';
import { ZImageView, ZTextArea, ZButton } from '@components/index';
import { View } from 'react-native';
import { createImageAnnotation } from '@actions';
import { AnnotationFactory } from '@common';
import { AnnotationTypes } from '@enums';
import { ImageTarget, BaseAnnotationBody } from '@models';



export class ImageAnnotationContainer extends Component {

    constructor(props) {

        super(props);
    }

    render(){

      let imageAnnotation = AnnotationFactory.createAnnotation(AnnotationTypes.ImageAnnotation);
      imageAnnotation.target = new ImageTarget();
      imageAnnotation.body = new BaseAnnotationBody();

      //TODO BRK set x y w h and url of target 
      
      // BRK DELETE
      let contentUri = 'https://berlincon2016.symfony.com/bundles/sensiosymfonylive/images/berlincon2016/assets/postcard.jpg';
      imageAnnotation.target.url = 'http://brk.com';
      imageAnnotation.target.x = 1;
      imageAnnotation.target.y = 2;
      imageAnnotation.target.w = 3;
      imageAnnotation.target.h = 4;

      // BRK DELETE

    	return(
        <View style={[style.zPage]}>

          <View style={{flex:1}}>
            <ZImageView imageUrl={contentUri}/>
          </View>


          <View style={{flex:2}}>
            
            <ZTextArea placeHolder="Enter annotation content here." 
              onChangeText={(text) => { imageAnnotation.body.value = text }}/>
            <ZButton text="Annotate" 
            onPress={() => this.props.createImageAnnotation(imageAnnotation)}/>

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
    createImageAnnotation: (annotationContent) => dispatch(createImageAnnotation(annotationContent))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(ImageAnnotationContainer);