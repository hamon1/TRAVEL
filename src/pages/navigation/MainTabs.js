import 'react-native-gesture-handler';

import React from 'react';

import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../Home/HomeScreen';
import Profile from '../Profile/Profile';
import PlaceDetails from '../Home/PlaceDetails';
import addPlace from '../Plans/PlanListScreen';

import HomeStack from './HomeStack';
import ProfileStack from './MyProfileStack';

import AppPlanButton from '../../components/ShowListButton';

import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <>
      <View style={styles.block}>
        <Tab.Navigator
          initialRouteName="Home"
          detachInactiveScreens={false}
          screenOptions={{
            tabBarActiveTintColor: '#fb8c00',
            tabBarShowLabel: false,
          }}>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="home" size={24} color={color} />
              ),
            }
          }
          />
          <Tab.Screen
            name="Profile"
            component={ProfileStack}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="person" size={24} color={color} />
              ),
            }}
          />
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
