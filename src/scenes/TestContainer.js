import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchData } from '@actions';

let styles

const TestContainer = (props) => {
  const {
    container,
    button,
    buttonText,
    mainContent
  } = styles

  return (
    <View style={container}>
      <TouchableHighlight style={button} onPress={() => props.fetchData()}>
        <Text style={buttonText}>Load Annotations</Text>
      </TouchableHighlight>
      <View style={mainContent}>
      {
        props.appData.isFetching && <Text>Loading</Text>
      }
      {
        props.appData.data.length ? (
          props.appData.data.map((annotaion, i) => {
            return <View key={i} >
              <Text>Name: {annotaion.title}</Text>
              <Text>Description: {annotaion.description}</Text>
            </View>
          })
        ) : null
      }
      </View>
    </View>
  )
}

styles = StyleSheet.create({
  container: {
    marginTop: 100
  },
  button: {
    height: 60,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b7eff'
  },
  buttonText: {
    color: 'white'
  },
  mainContent: {
    margin: 10,
  }
})

function mapStateToProps (state) {
  return {
    appData: state.dataReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchData: () => dispatch(fetchData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestContainer);