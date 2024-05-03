import 'react-native-gesture-handler';

import React from 'react';

import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../Home/HomeScreen';
import Profile from '../Profile/Profile';
import PlaceDetails from '../Home/PlaceDetails';
import addPlace from '../Home/addPlaceScreen';

import AppPlanButton from '../../components/NewPlanButton';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <>
      <View style={styles.block}>
        <Tab.Navigator detachInactiveScreens={false}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </View>
      <AppPlanButton />
    </>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  },
});

export default TabNavigator;
