import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function AddIcon({name, color, onPress, style}) {
  return (
    <View>
      <Pressable style={style} onPress={onPress}>
        <Icon name="plus" color={color} size={32} />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    // backgroundColor: 'green',
  },
});

export default AddIcon;
