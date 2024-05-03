import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NumOfPeople = () => {
  return (
    <View styles={styles.container}>
      <Text>1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 42,
    height: 12,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NumOfPeople;
