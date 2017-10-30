import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from '@style/main';
import privateStyle from './style';
import { View, Button, Text, Image } from 'react-native';
import { ZTextBox, ZButton } from '@components';
import { register } from '@actions';



export class SignUpScene extends Component {

    render(){

    	const { navigate } = this.props.navigation;
      let formInfo = {
        userName: '',
        password: '',
        email: ''
      }

    	return(

        <View style={[style.zPage]}>

        <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
          <Image source={require('../../assets/img/AppIcon.png')}
            style={style.logo} />
          <Text style={style.logoText}>
            living memories
          </Text>
        </View>


          <View style={{flex:2, alignItems:'center', justifyContent:'flex-end'}}>
            <View style={[privateStyle.componentContainer]}>
              <ZTextBox placeHolder="User name" 
                onChangeText={(text) => { formInfo.userName = text }}/>
            </View>

            <View style={[privateStyle.componentContainer]}>
              <ZTextBox placeHolder="Email"
                onChangeText={(text) => { formInfo.email = text }}/>
            </View>

            <View style={[privateStyle.componentContainer]}>
              <ZTextBox placeHolder="Password"
                secureTextEntry={true}
                onChangeText={(text) => { formInfo.password = text }}/>
            </View>
            
            <View style={[privateStyle.componentContainer]}>
              <ZButton text="Create Account"
                onPress={() => this.props.register(formInfo)}/>
            </View>
          </View>

        </View>
		)
    }
}


function mapStateToProps (state) {
  return {
    appData: state.RegistrationReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    register: (formInfo) => dispatch(register(formInfo))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(SignUpScene);