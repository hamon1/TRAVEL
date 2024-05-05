import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function AddIcon({name, color, onPress}) {
  return (
    <View>
      <Pressable style={styles.button} onPress={onPress}>
        <Icon name="plus" color={'black'} size={32} />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {

  },
});

export default AddIcon;
