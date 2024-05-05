import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NumOfPeople = () => {
  return (
    <View styles={styles.container}>
      <Icon style={styles.icon} name="people" size={24} color="#000000" />
      {/** 친구목록.length */}
      <Text style={styles.num}>1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#df2571',
    width: 56,
    height: 32,
    borderRadius: 15,
  },
  icon: {
    top: 4,
    left: 8,
  },
  num: {
    top: 4,
    position: 'absolute',
    left: 36,
    fontSize: 18,
  },
});

export default NumOfPeople;
