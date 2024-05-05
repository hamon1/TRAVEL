import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const Setting = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon name="settings-sharp" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Setting;
