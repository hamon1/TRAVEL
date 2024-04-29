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
import NavigationContainer from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

function Place_detaile() {
  const navigation = useNavigation();
  return (
    <NavigationContainer>
      <View>
        <Button title="back" onPress={() => navigation.goBack()} />
        <ScrollView>
          <Text>Place1</Text>
          <Text>Place2</Text>
        </ScrollView>
      </View>
    </NavigationContainer>
  );
}

export default Place_detaile;
