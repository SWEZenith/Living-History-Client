import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from '@style/main';
import privateStyle from './style';
import { View, Button, Text, Image } from 'react-native';
import { ZTextBox, ZButton } from '@components';
import { login } from '@actions';
import * as actionTypes from '@actions/actionTypes';




export class LoginScene extends Component {

    constructor(props) {

        super(props);
    }

    componentWillReceiveProps(nextProps) {

    	if(this.props.appData.isAuthenticated == false && nextProps.appData.isAuthenticated == true)
    		this.props.navigation.navigate('ImageContent');

    	console.log('isAuthenticated: ', this.props.appData.isAuthenticated);
    	console.log('actionType: ', this.props.appData.actionType);
	}

    render(){




    	const { navigate } = this.props.navigation;
    	let credentials = {
    		username: '',
    		password: ''
    	}
    	let error = this.props.appData.error;
    	let errText = error != undefined ? error.message != null ? error.message  : "" : "";

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
							autoCapitalize="none"
							onChangeText={(text) => { credentials.username = text }}/>
					</View>
					<View style={privateStyle.componentContainer}>
						<ZTextBox placeHolder="Password"
							secureTextEntry={true}
							autoCapitalize="none"
							onChangeText={(text) => { credentials.password = text }}/>
					</View>
					<View style={privateStyle.componentContainer}>
						<ZButton text="Sign In"
							onPress={() => this.props.login(credentials)}/>
					</View>
				</View>


				<View style={{flex:1, alignItems:'center', justifyContent:'flex-end'}}>

					<Text style={{color:'red', marginTop:10, textAlign:'center'}}>
						{errText}
					</Text>

					<View style={{marginBottom:20}}>
					<Button
						color='#4F4F4F'
						style={{height:5}}
						title="Create new account"
					  	onPress={() => navigate('SignUp')}/>
					  	</View>
				</View>
				

			</View>
		)
    }
}


function mapStateToProps (state) {
  return {
  	appData: state.AuthReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
  	login: (credentials) => dispatch(login(credentials))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(LoginScene);