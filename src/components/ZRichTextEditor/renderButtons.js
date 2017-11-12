import React from 'react';
import { FlatList, TouchableOpacity, Text } from 'react-native';
import { colors } from './style';

import Formats from './Formats';


const defaultStyles = { padding: 8, color: colors.FOREGROUND_COLOR, fontSize: 16 };

const defaultButton = ({ item, getState, setState }) => {
  return (
    <TouchableOpacity onPress={() => item.onPress({ getState, setState, item })}>
      <Text style={[defaultStyles, item.style]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export const renderFormatButtons = ({ getState, setState }, formats, button) => {
  const list = (
    <FlatList
      data={formats ? formats : Formats}
      keyboardShouldPersistTaps="always"
      renderItem={({ item, index }) =>
        button
          ? button({ item, getState, setState })
          : defaultButton({ item, getState, setState })}
      horizontal
    />
  );
  return list;
};
