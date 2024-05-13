import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTabs';

import HomeScreen from '../Home/HomeScreen';
import PlaceDetail from '../Home/PlaceDetails';
import addPlace from '../Plans/PlanListScreen';
import friends from '../FriendsList/FriendsScreen';
import chatroom from '../Chat/ChatScreen';

import IconAdd from '../../components/IconPlus';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
        initialRouteName={HomeScreen}
        etachInactiveScreens={false}
      />
      <Stack.Screen
        name="addPlace"
        component={addPlace}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
