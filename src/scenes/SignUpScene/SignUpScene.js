import React, { Component } from 'react';
import { connect } from 'react-redux';
import { style } from '@style/main';
import privateStyle from './style';
import { View, Button, Text, Image, ScrollView } from 'react-native';
import { ZTextBox, ZButton } from '@components';
import { register } from '@actions';



export class SignUpScene extends Component {

  componentWillReceiveProps(nextProps) {

    if (this.props.appData.isRegistered === false && nextProps.appData.isRegistered === true)
      this.props.navigation.navigate('Login');
  }


  render() {

    const { navigate } = this.props.navigation;
    let formInfo = {
      username: '',
      password1: '',
      password2: '',
      email: ''
    }

    return (

      <View style={[style.zPage]}>
        <ScrollView scrollEnabled={false} >
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/img/app-icon-purple.png')}
              style={style.logo} />
            <Text style={style.logoText}>
              living memories
          </Text>
          </View>

          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
            <View style={[privateStyle.componentContainer]}>
              <ZTextBox placeHolder="User name"
                autoCapitalize="none"
                onChangeText={(text) => { formInfo.username = text }} />
            </View>

            <View style={[privateStyle.componentContainer]}>
              <ZTextBox placeHolder="Email"
                autoCapitalize="none"
                onChangeText={(text) => { formInfo.email = text }} />
            </View>

            <View style={[privateStyle.componentContainer]}>
              <ZTextBox placeHolder="Password"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(text) => { formInfo.password1 = text; formInfo.password2 = text; }} />
            </View>

            <View style={[privateStyle.componentContainer]}>
              <ZButton text="Create Account"
                onPress={() => this.props.register(formInfo)} />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}


function mapStateToProps(state) {
  return {
    appData: state.RegistrationReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    register: (formInfo) => dispatch(register(formInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScene);