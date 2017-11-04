import React, { Component } from 'react';
import { style } from '@style/main';
import { Image } from 'react-native';
import Dimensions from 'Dimensions';
import { StyleSheet } from 'react-native';

const win = Dimensions.get('window');

class ZImageView extends Component {

	render(){
		return(
	      	<Image 
       			style={styles.image}
       			resizeMode={'contain'}
       			source={{uri:this.props.imageUrl}} 
   			/> 
		)
	}
}


const styles = StyleSheet.create({
    image: {
        flex: 1,
        alignSelf: 'stretch',
        width: win.width - (style.zPage.paddingLeft * 2),
        height: win.height,
    }
});


export { ZImageView };