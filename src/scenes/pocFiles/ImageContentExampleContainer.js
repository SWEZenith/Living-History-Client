import React, { Component } from 'react';
import { TouchableHighlight, View, Text, Image, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import {createResponder} from 'react-native-gesture-responder';
const {width, height} = Dimensions.get('window');


export class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
          gestureState: {},
          thumbSize: 100,
          left: 50,
          top: 50
        }
      }


  componentWillMount() {
    
    this.gestureResponder = createResponder({
      onStartShouldSetResponder: (evt, gestureState) => true,
      onStartShouldSetResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetResponder: (evt, gestureState) => true,
      onMoveShouldSetResponderCapture: (evt, gestureState) => true,

      onResponderGrant: (evt, gestureState) => {
      },
      onResponderMove: (evt, gestureState) => {

        let thumbSize = this.state.thumbSize;
        if (gestureState.pinch && gestureState.previousPinch) {
          thumbSize *= (gestureState.pinch / gestureState.previousPinch)
        }
        let {left, top} = this.state;

        let leftDiff = (gestureState.moveX - gestureState.previousMoveX);
        let topDiff = (gestureState.moveY - gestureState.previousMoveY);

        if( 
          ((left - thumbSize/2) + leftDiff) > 0 
          && 
          ((left + thumbSize/2) + leftDiff) < width 
          &&
          ((top - thumbSize/2) + topDiff) > 0
          &&
          ((top + thumbSize/2) + topDiff) < height
          ) {
          
          left += (gestureState.moveX - gestureState.previousMoveX);
          top += (gestureState.moveY - gestureState.previousMoveY);          
        }

        this.setState({
          gestureState: {
            ...gestureState
          },
          left, top, thumbSize
        })
      },
      onResponderTerminationRequest: (evt, gestureState) => true,
      onResponderRelease: (evt, gestureState) => {
        this.setState({
          gestureState: {
            ...gestureState
          }
        })
      },
      onResponderTerminate: (evt, gestureState) => {
      },
      onResponderSingleTapConfirmed: (evt, gestureState) => {
        Alert.alert(`x: ${this.state.left - this.state.thumbSize/2}, y: ${this.state.top - this.state.thumbSize/2}`)
      },
      debug: true
    });
  }

  render() {
    const thumbSize = this.state.thumbSize;
    return (

      <View style={{flex: 1, backgroundColor: '#66ccff', padding: 20}}
        {...this.gestureResponder}>
        <Image 
          style={{ width:'100%', height:'20%' }} 
          source={{uri: 'https://berlincon2016.symfony.com/bundles/sensiosymfonylive/images/berlincon2016/assets/postcard.jpg'}}>        
            <View
              style={{
                width: thumbSize,
                height: thumbSize,
                position: 'absolute',
                left: this.state.left - thumbSize/2,
                top: this.state.top - thumbSize/2,
                backgroundColor: '#FFF',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              pointerEvents='none'>
              
              <Text> Annotation </Text>
            </View>
          </Image>

          <LabelView label='SIZE' value={thumbSize}/>          
          <LabelView label='CURRENT X' value={this.state.left - thumbSize/2}/>          
          <LabelView label='CURRENT Y' value={this.state.top - thumbSize/2}/>  
        </View>
    );
  }


}


class LabelView extends Component {
  render() {
    return (
      <View
        style={{flexDirection: 'row', alignSelf: 'stretch'}}>
        <Text style={{flex: 3, textAlign: 'right', marginRight: 10}}>{this.props.label}</Text>
        <Text style={{flex: 7, textAlign: 'left', marginLeft: 10}}>{JSON.stringify(this.props.value)}</Text>
      </View>
    );
  }
}

const ImageContentExampleContainer = (props) => {
  
  return (
    <View style={{flex:1, backgroundColor:'#7f8c8d', paddingLeft:35, paddingRight:35}}>
      <Text style={{fontWeight:'bold', marginTop:40, marginBottom:10}}>Content</Text>
        <Image style={{ width:'100%', height:'20%' }} source={{uri: 'https://berlincon2016.symfony.com/bundles/sensiosymfonylive/images/berlincon2016/assets/postcard.jpg'}} />
    </View>


  )
}



function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);