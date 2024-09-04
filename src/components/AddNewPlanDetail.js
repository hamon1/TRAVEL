/**
 * 여행지 리스트 보여주는 버튼.
 */

import React, { useState } from 'react';
import {Pressable, StyleSheet, View, ActionSheetIOS, Platform, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';
import PlanOptionsModal from './PlanOptionsModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TABBAR_HEIGHT = 49;

function NewPlanButton({onPress}) {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const bottom = Platform.select({
    android: TABBAR_HEIGHT / 2,
    ios: TABBAR_HEIGHT / 2 + insets.bottom - 4,
  });

  // const onPress = () => {
  //   if (Platform.OS === 'android') {
  //     setModalVisible(true);
  //     return;
  //   }
  
  // const movePlace = () => {
  //   navigation.push('Plan_Place_Setting');
  // };
  // console.log('anp docId', docId);

  //   ActionSheetIOS.showActionSheetWithOptions(
  //     {
  //       options: ['Place', 'Transportation', 'Rantal Home', 'Restaurant','Others', 'Cancle'],
  //       cancelButtonIndex: 5.
  //     },
  //     (buttonIndex) => {
  //       if (buttonIndex === 0) {
  //           navigation.push('PlanPlaceScreen', {docId: docId});
  //       } else if (buttonIndex === 1) {
  //         navigation.push('PlanTransScreen', {docId: docId});
  //       } else if (buttonIndex === 2) {
  //         navigation.push('PlanRantalScreen', {docId: docId});
  //       } else if (buttonIndex === 3) {
  //         navigation.push('PlanRestScreen', {docId: docId});
  //       } else if (buttonIndex === 4) {
  //         navigation.push('PlanOtherScreen', {docId: docId});
  //       }
  //     },
  //   );
  // };

  return (
    <>
    <View style={[styles.wrapper, {bottom}]}>
      <TouchableOpacity
        // android_ripple={{
        //   color: '#ffffff',
        // }} 
        style={styles.circle}
        onPress={onPress}>
        <Icon name="plus" color={'white'} size={36} />
      </TouchableOpacity>
    </View>
    {/* <PlanOptionsModal
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
    /> */}
    </>
  );
}

const styles = StyleSheet.create({
  /*
  container: {
    position: 'absolute',
    bottom: 12,
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
  */
 wrapper: {
  zIndex: 5,
  borderRadius: 27,
  height: 54,
  width: 54,
  position: 'absolute',
  left: '50%',
  transform: [
    {
      translateX: -27,
    },
  ],
  ...Platform.select({
    ios: {
      shadowColor: '#4d4d4d',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    android: {
      elevation: 5,
      overflow: 'hidden',
    },
  }),
 },
 circle: {
  backgroundColor: 'orange',
  borderRadius: 27,
  height: 54,
  width: 54,
  alignItems: 'center',
  justifyContent: 'center',
 },
});

export default NewPlanButton;
