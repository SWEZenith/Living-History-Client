import React, { Component } from 'react';
import { View, Text, TextInput} from 'react-native';
import privateStyle from './style';

class ZTextBox extends Component {

	render(){

		let {onChangeText, placeHolder, secureTextEntry, autoCapitalize, placeholderTextColor, style, value, multiline, blurOnSubmit} = this.props;
        let defaultPlaceHolderColor = '#9B51E0';
        let defaultMultiline = false;
        let defaultBlurOnSubmit = true;

		return(
      		<TextInput
        		placeholder={placeHolder}
                autoCapitalize={autoCapitalize}
        		style={[privateStyle.input, style]}
        		multiline={multiline || defaultMultiline}
                blurOnSubmit={blurOnSubmit || defaultBlurOnSubmit}
                secureTextEntry={secureTextEntry}
                value={value}
                placeholderTextColor={placeholderTextColor || defaultPlaceHolderColor}
				onChangeText={(text) => onChangeText(text)}
				underlineColorAndroid="transparent"
      		/>
		)
	}
}

export { ZTextBox };