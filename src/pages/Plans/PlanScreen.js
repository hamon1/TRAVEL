import React from 'react';
import {View, Text} from 'react-native';

const PlanScreen = ({route}) => {
  return (
    <View>
      <Text>plan screen</Text>
      <Text>id: {route.params.id}</Text>
    </View>
  );
};

export default PlanScreen;
