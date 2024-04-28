// /**
//  * 매인 화면 (로그인 시, 가장 먼저 보이는 화면)
//  * 여행지 추천 목록  - 무한 스크롤.
//  * 
//  * @format
//  */

import React from 'react';
import Controlbar from '../Footer/ControlBar';
import Topbar from '../header/Top';
import PlaceBoard from './Place_info';
import TabNavigation from '../navigation/TabNavigation';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import Navigation from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/native';
import NavigationBar from '../navigation/index';

import { NavigationContainer } from "@react-navigation/native";


import BottomTabNavigator from '../navigation/TabNavigation';

// text -> tlatlist(travel data)
const Background = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>Hello World!</Text>
        <TouchableOpacity
          style={styles.board}
        onPress={() => Navigation.navigate(PlaceBoard)}>
          <Text>여기는 버튼입니다.</Text>
        </TouchableOpacity>
      </View>
      {/* <NavigationBar /> */}
      <Topbar />
      <Controlbar navigation={undefined} />
      {/* <TabNavigation /> */}
      {/* <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'black',
    width: 42,
    height: 42,
    fontSize: 20,
  },
  board: {
    backgroundColor: 'red',
    height: 100,
  }
});

export default Background;
