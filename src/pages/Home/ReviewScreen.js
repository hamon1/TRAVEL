import React from 'react';
import {View, Text} from 'react-native';

const ReviewScreen = ({route}) => {
  return (
    <View>
      <Text>Review Screen</Text>
      <Text>place id: {route.params.id}</Text>
    </View>
  );
};

export default ReviewScreen;
