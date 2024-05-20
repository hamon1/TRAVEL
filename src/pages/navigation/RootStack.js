import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTabs';

import HomeScreen from '../Home/HomeScreen';
import PlaceDetail from '../Home/PlaceDetails';
import addPlace from '../Plans/PlanListScreen';
import friends from '../FriendsList/FriendsScreen';
import ChatScreen from '../Chat/ChatScreen';
import reviewScreen from '../Home/ReviewScreen';
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
        // etachInactiveScreens={false}
      />
      <Stack.Screen name="addPlace" component={addPlace} />
      <Stack.Screen name="chatScreen" component={ChatScreen} />
      <Stack.Screen name="reviewScreen" component={reviewScreen} />
    </Stack.Navigator>
  );
}

export default RootStack;
