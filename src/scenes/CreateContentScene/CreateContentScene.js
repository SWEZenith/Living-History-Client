import React, { Component } from 'react';
import { connect } from 'react-redux';
import { style } from '@style/main';
import privateStyle from './style';
import { View, Text } from 'react-native';
import { ZButton } from '@components';



export class CreateContentScene extends Component {

    static navigationOptions = { header: <Text style={{ display:"none" }} ></Text> };
    
    render(){

      const { navigate } = this.props.navigation;

    	return(
        <View style={[style.zPage]}>
          <View style={{flex:1}}>

            <View style={{flex:1}}></View>


            <View style={{flex:1, alignItems:'center', justifyContent:'flex-start'}}>
              
              <Text style={{fontSize:32}}>
                Create Content
              </Text>

              <Text style={{marginTop:20}}>
                You can choose to create an image content or text content.
              </Text>

              <View style={{flex:1, flexDirection:'row',alignItems:'stretch', marginTop:25}}>
                <View style={{flex:1, alignItems:'flex-start'}}>
                  <ZButton text="Create Image Content" 
                            buttonStyle={{width:170}}
                            onPress={() => navigate('CreateImageContent')}/>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                  <ZButton text="Create Text Content" 
                            buttonStyle={{width:170}}
                            onPress={() => navigate('CreateTextContent')}/>
                </View>
              </View>
            </View>


            <View style={{flex:1}}></View>

          </View>
        </View>
		  )
    }

}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(CreateContentScene);