import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTabs';

import HomeScreen from '../Home/HomeScreen';
import PlaceDetail from '../Home/PlaceDetails';
import addPlace from '../Plans/PlanListScreen';
import friends from '../FriendsList/FriendsScreen';
import ChatScreen from '../Chat/ChatScreen';
import IconAdd from '../../components/IconPlus';
import PlanScreen from '../Plans/PlanScreen';
import SignInScreen from '../Login/SignInScreen';
import Plan_Place_Setting from '../Plans/Plan_Place_Setting';
import CalendarView from '../../components/CalendarView';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
        initialRouteName={HomeScreen}
        // etachInactiveScreens={false}
      />
      <Stack.Screen name="addPlace" component={addPlace} />
      <Stack.Screen name="chatScreen" component={ChatScreen} />
      <Stack.Screen name="planScreen" component={PlanScreen} />
      <Stack.Screen
        name="Plan_Place_Setting"
        component={Plan_Place_Setting}
        options={{title: 'PlanPlace'}}
      />
      <Stack.Screen
        name="CalendarView"
        component={CalendarView}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
