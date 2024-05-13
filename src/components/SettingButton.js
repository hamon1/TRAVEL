import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

function SettingButton() {
  return (
    <View style={styles.container}>
      <Icon name="settings-sharp" color={'black'} size={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
    top: 10,
    left: 10,
  },
});

export default SettingButton;
