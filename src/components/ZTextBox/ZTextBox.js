import React, { Component } from 'react';
import { View, Text, TextInput} from 'react-native';
import style from './style';

class ZTextBox extends Component {

	render(){

		let {onChangeText, placeHolder, secureTextEntry, autoCapitalize} = this.props;

		return(
      		<TextInput
        		placeholder={placeHolder}
            autoCapitalize={autoCapitalize}
        		style={style.input}
        		multiline={false}
            secureTextEntry={secureTextEntry}
            placeholderTextColor='#9B51E0'
        		onChangeText={(text) => onChangeText(text)}
      		/>
		)
	}
}

export { ZTextBox };