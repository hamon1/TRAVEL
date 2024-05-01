/*
추가할 플랜 목록 보여주기.
-> 새 플랜 생성도.
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

const AddPlace = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Plan list</Text>
    </View>
  );
};

export default AddPlace;