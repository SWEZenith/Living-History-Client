import React, { Component } from 'react';
import { View, Text, TextInput} from 'react-native';
import style from './style';

class ZTextArea extends Component {

	render(){
		return(
      <TextInput
        placeholder={this.props.placeHolder}
        style={style.input}
        multiline={true}
      />
		)
	}
}

export { ZTextArea };