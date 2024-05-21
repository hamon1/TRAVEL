import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const PlanScreen = ({route}) => {
  return (
    <View style={styles.block}>
      <Text>plan screen</Text>
      <Text>id: {route.params.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'gray',
  },
});

export default PlanScreen;
