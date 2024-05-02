import 'react-native-gesture-handler';

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../Home/HomeScreen';
import PlaceDetails from '../Home/PlaceDetails';
import addPlace from '../Home/addPlaceScreen';

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
      <Stack.Navigator
        initialRouteName="HomeScreen"
        detachInactiveScreens="false"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
        <Stack.Screen name="addPlace" component={addPlace} />
      </Stack.Navigator>
  );
};
export default HomeStack;
