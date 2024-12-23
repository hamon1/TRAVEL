import React, { useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTabs';

import HomeScreen from '../Home/HomeScreen';
import addPlan from '../Plans/PlanListScreen';
import friends from '../FriendsList/FriendsScreen';
import ChatScreen from '../Chat/ChatScreen';
import IconAdd from '../../components/IconPlus';
import PlanScreen from '../Plans/PlanScreen';
import SignInScreen from '../Login/SignInScreen';
import WelcomeScreen from '../../welcome/screens/WelcomeScreen';
import PlaceSearchScreen from '../Plans/screens/PlaceSearchScreen';
import { useUserContext } from '../../components/UserContext';
import PlanStack from './PlanStack';
import { InvitedUserList } from '../Plans/InvitedUserList';
import { getUser} from '../../lib/users';
import { subscribeAuth } from '../../lib/auth';


const Stack = createNativeStackNavigator();

function RootStack() {
  const {user, setUser} = useUserContext();

  useEffect(() => {
    const unsubscribe = subscribeAuth(async currentUser => {
      unsubscribe();
      if (!currentUser) {
        return;
      }
      const profile = await getUser(currentUser.uid);
      if (!profile) {
        return;
      }
      setUser(profile);
    });
  }, [setUser]);

  return (
    <Stack.Navigator>
      {user ? (
        <>
        <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{headerShown: false}}
            initialRouteName={HomeScreen}
            // etachInactiveScreens={false}
          />
          <Stack.Screen 
            name='PlanStack'
            component={PlanStack}
            options={{headerShown: false}}
          />
          <Stack.Screen name="addPlan" component={addPlan} 
            options={{title: '계획 목록', headerBackTitleVisible: (false)}}
          />
          <Stack.Screen name="chatScreen" component={ChatScreen} 
            options={{title: '채팅창', headerBackTitle: false}}
          />
          <Stack.Screen name="planScreen" component={PlanScreen} 
            options={{title: '', headerBackTitleVisible: (false)}}
          />
          <Stack.Screen
            name="InvitedUserList"
            component={InvitedUserList}
            options={{title: '참여자 목록'}}
          />
          <Stack.Screen
            name="PlaceSearchScreen"
            component={PlaceSearchScreen}
            options={{title:''}}
          />
        </>
      ) : (
      <>
      <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{headerShown: false}}
          />
          
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
      </>
      )}  
    </Stack.Navigator>
  );
}

export default RootStack;