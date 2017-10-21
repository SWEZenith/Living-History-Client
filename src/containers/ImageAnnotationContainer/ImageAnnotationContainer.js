import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from '@style/main';
import { ZImageView } from '@components/index';
import { View, Text} from 'react-native';


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
          <Text>BRK</Text>
          </View>


        </View>
		  )
    }

}


function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(ImageAnnotationContainer);