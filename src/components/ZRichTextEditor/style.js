import { StyleSheet } from 'react-native';


const colors = {
  FOREGROUND_COLOR: '#9B51E0'
}

const styles = StyleSheet.create({
  composeText: {
    borderColor: colors.FOREGROUND_COLOR,
    borderWidth: 1,
    flexDirection: 'column',
    flex: 1,
    padding: 4,
    paddingLeft: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.FOREGROUND_COLOR
  },
  inlinePadding: {
    padding: 8,
  },
  screen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
});

export { colors, styles};