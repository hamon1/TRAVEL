import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../Home/Home';
import PlaceDetaile from '../Home/Place_info';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PlaceDetaile" component={PlaceDetaile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default HomeStack;
