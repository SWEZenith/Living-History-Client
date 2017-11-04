import React, { Component } from 'react';
import { View, Text, TextInput} from 'react-native';
import privateStyle from './style';

class ZTextBox extends Component {

	render(){

		let {onChangeText, placeHolder, secureTextEntry, autoCapitalize, placeholderTextColor, style} = this.props;
        let defaultPlaceHolderColor = '#9B51E0';

		return(
      		<TextInput
        		placeholder={placeHolder}
                autoCapitalize={autoCapitalize}
        		style={[privateStyle.input, style]}
        		multiline={false}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={placeholderTextColor || defaultPlaceHolderColor}
        		onChangeText={(text) => onChangeText(text)}
      		/>
		)
	}
}

export { ZTextBox };