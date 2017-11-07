import React, { Component } from 'react';
import {
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { colors, styles } from './style';


import { renderFormatButtons } from './renderButtons';



class ZRichTextEditor extends Component {

  /**
   *  Ctor.
   */
  constructor(props) {
    
    super(props);
    this.state = {
      text: '',
      selection: { start: 0, end: 0 }
    };
  }

  textInput: TextInput;

  /**
   *  Triggered when text changes.
   */
  changeText = (input: string) => {

    this.setState({ text: input });

    if (this.props.onTextChange) 
      this.props.onTextChange(input);
  };


  /**
   *  Triggered when selection changes.
   */
  onSelectionChange = event => {

    this.setState({
      selection: event.nativeEvent.selection,
    });
  };

  /**
   *  Triggered when component is loaded.
   */
  componentDidMount() {

    this.textInput.focus();
  }
  
  getState = () => {
    this.setState({
      selection: {
        start: 1,
        end: 1,
      },
    });
    return this.state;
  };

  render() {

    const WrapperView = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
    const { Formats, buttonFunction, placeholder, autoCorrect } = this.props;
    const { text, selection } = this.state;

    return (

      <WrapperView behavior="padding" style={styles.screen}>
        <View style={styles.buttonContainer}>
          {renderFormatButtons(
            {
              getState: this.getState,
              setState: (state, callback) => {
                this.textInput.focus();
                this.setState(state, callback);
              },
            },
            Formats,
            buttonFunction,
          )}
        </View>
        <TextInput
          style={styles.composeText}
          multiline
          autoCorrect={autoCorrect || false}
          underlineColorAndroid="transparent"
          onChangeText={this.changeText}
          onSelectionChange={this.onSelectionChange}
          value={text}
          placeholder={placeholder || 'Placeholder'}
          ref={textInput => (this.textInput = textInput)}
          selection={selection}
        />
      </WrapperView>
    );
  }
}

export { ZRichTextEditor };
