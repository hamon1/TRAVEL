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
import SearchScreen from '../../../mysrc/screens/SearchScreen';
import Search_Plan from '../../../mysrc/screens/Search_Plan';
import Search_Rent from '../../../mysrc/screens/Search_Rent';
import Search_Trans from '../../../mysrc/screens/Search_Trans';
import Search_Rest from '../../../mysrc/screens/Search_Rest';

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
      <Stack.Screen name="planScreen" component={PlanScreen} />
      <Stack.Screen name='SearchScreen' component={SearchScreen} />
      <Stack.Screen name='Search_Plan' component={Search_Plan} />
      <Stack.Screen name='Search_Rent' component={Search_Rent} />
      <Stack.Screen name='Search_Rest' component={Search_Rest} />
      <Stack.Screen name='Search_Trans' component={Search_Trans} />
    </Stack.Navigator>
  );
}

export default RootStack;
