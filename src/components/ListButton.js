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
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <Pressable style={({pressed}) => [styles.button, pressed && {opacity: 0.5}]} onPress={onPress}>
        <Icon name="arrow-forward-ios" color={'white'} size={24} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    left: '50%',
    transform: [{translateX: -30}],
    zIndex: 5,
    width: 56,
    height: 56,
    borderRadius: 28,
    // shadowColor: '#4d4d4d',
    // shadowOffset: {width: 0, height: 4},
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    elevation: 8,
  },
  button: {
    borderWidth: 6,
    borderColor: 'white',
    width: 60,
    height: 60,
    backgroundColor: '#fb8c00',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewPlanButton;
