/**
 * 여행지 리스트 보여주는 버튼.
 */

import React from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function NewPlanButton() {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('addPlace');
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>
        <Icon name="list" color={'white'} size={36} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    left: '50%',
    transform: [{translateX: -28}],
    zIndex: 5,
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: '#4d4d4d',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  button: {
    width: 56,
    height: 56,
    backgroundColor: '#fb8c00',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewPlanButton;