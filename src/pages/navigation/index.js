import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Home/Home';
import ProfileScreen from '../Profile/Profile';
import CustomTabBar from './CustomTabBar';


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <CustomTabBar {...props } />}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
