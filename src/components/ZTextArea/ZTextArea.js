import React, { Component } from 'react';
import { View, Text, TextInput} from 'react-native';
import style from './style';

class ZTextArea extends Component {

	render(){

		let {onChangeText, placeHolder} = this.props;

		return(
      		<TextInput
        		placeholder={placeHolder}
        		style={style.input}
        		multiline={true}
        		onChangeText={(text) => onChangeText(text)}
      		/>
		)
	}
}

export { ZTextArea };