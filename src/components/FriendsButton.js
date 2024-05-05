import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NumOfPeople = () => {
  return (
    <View styles={styles.container}>
      
      <Icon name="people" size={24} color="#000000" />
      {/** 친구목록.length */}
      <Text style={styles.num}>1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  num: {
  
  }
});

export default NumOfPeople;
