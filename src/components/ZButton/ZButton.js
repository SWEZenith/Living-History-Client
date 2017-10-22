import React, { Component } from 'react';
import { TouchableHighlight, Text } from 'react-native';
import styles from './style';

class ZButton extends Component {

	render(){

        let {onPress, children, buttonStyle, textStyle, text} = this.props;

		return(
			<TouchableHighlight
  				style={[styles.button, buttonStyle]}
                onPress={onPress}
				underlayColor='#fff'>
			    	<Text style={[styles.text, textStyle]}>
			    		{text}
			    	</Text>
			</TouchableHighlight>
		)
	}
}

export { ZButton };
