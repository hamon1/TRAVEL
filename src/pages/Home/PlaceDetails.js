/*
 */

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// eslint-disable-next-line react-hooks/rules-of-hooks

const Place_detaile = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Place_detaile</Text>
      <Button title="add" onPress={() => navigation.navigate('addPlace')} />
    </View>
  );
};

export default Place_detaile;
