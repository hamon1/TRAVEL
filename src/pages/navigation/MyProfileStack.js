import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Profile from '../Profile/Profile';
import FriendListScreen from '../FriendsList/FriendsScreen';
import SettingScreen from '../Profile/Setting';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FriendList"
        component={FriendListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
