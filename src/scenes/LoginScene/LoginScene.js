import React, { Component } from 'react';
import { connect } from 'react-redux';
import { style } from '@style/main';
import privateStyle from './style';
import { View, Button, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ZTextBox, ZButton } from '@components';
import { login } from '@actions';
import * as actionTypes from '@actions/actionTypes';




export class LoginScene extends Component {

	static navigationOptions = { header: <Text style={{ display: "none" }} ></Text> };

	render() {

		const { navigate } = this.props.navigation;
		let credentials = {
			username: '',
			password: ''
		}
		let error = this.props.appData.error;
		let errText = error != undefined ? error.message != null ? error.message : "" : "";


		return (
			<View style={privateStyle.pageContainer}>
				<ScrollView style={privateStyle.scrollSectionDimension} contentContainerStyle={privateStyle.scrollSection} >
					<Image style={privateStyle.backgroundImage}
						source={require('../../assets/img/city.png')} />

					<View style={privateStyle.darkLayer} />

					<View style={privateStyle.logoContainer}>
						<Image source={require('../../assets/img/app-icon-white.png')}
							style={style.logo} />
						<Text style={[style.logoText, { color: '#FFF' }]}>
							living memories
						</Text>
					</View>

					<View style={privateStyle.formContainer}>
						<View style={[privateStyle.componentContainer]}>
							<ZTextBox placeHolder="User name"
								placeholderTextColor="#FFF"
								style={privateStyle.textInput}
								autoCapitalize="none"
								onChangeText={(text) => { credentials.username = text }} />
						</View>
						<View style={privateStyle.componentContainer}>
							<ZTextBox placeHolder="Password"
								placeholderTextColor="#FFF"
								style={privateStyle.textInput}
								secureTextEntry={true}
								autoCapitalize="none"
								onChangeText={(text) => { credentials.password = text }} />
						</View>
						<View style={privateStyle.componentContainer}>
							<ZButton text="Sign In"
								buttonStyle={privateStyle.loginButton}
								onPress={() => this.props.login(credentials)} />
						</View>
					</View>

					<View style={privateStyle.footerContainer}>
						<View style={privateStyle.newAccountButtonContainer}>
							<TouchableOpacity onPress={() => navigate('SignUp')}>
								<Text style={privateStyle.newAccountButtonText}>
									Create new account
					    	</Text>
							</TouchableOpacity>
						</View>
						<Text style={privateStyle.errorText}>
							{errText}
						</Text>
					</View>

				</ScrollView>
			</View>
		)
	}
}


function mapStateToProps(state) {
	return {
		appData: state.AuthReducer
	}
}

function mapDispatchToProps(dispatch) {
	return {
		login: (credentials) => dispatch(login(credentials))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScene);
