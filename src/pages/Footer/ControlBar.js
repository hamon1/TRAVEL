/*
화면 하단의 홈/플래너/프로필 전환 바

공통된 부분임
+) 버튼 클릭 시, 색상 변경
*/

import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { UseNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Home/Home';
import ProfileScreen from '../Profile/Profile';
import { ColorProperties } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';


/*use tabNavigation*/
const Buttombar = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.button}></View>
      <View style={styles.button}></View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ProfileScreen')}>
        <Text>home</Text>
      </TouchableOpacity>
    </View>

    /* <View style = {styles.button}>
              <Home_icon style = {styles.icon}/>
          </View>
          <View style = {styles.button}>
              <AddPlan_icon style = {styles.icon}/>
          </View>
          <View style = {styles.button}>
              <Profile_icon style = {styles.icon}/>
          </View> */
          
  );
};


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'black',
    width: 42,
    height: 42,
  },
  icon: {
    width: 42,
    height: 42,
    backgroundColor: 'black',
  },
});

export default Buttombar;
