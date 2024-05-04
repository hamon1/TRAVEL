import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTabs';

import PlaceDetail from '../Home/PlaceDetails';
import addPlace from '../Plans/PlansScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
      />
      <Stack.Screen name="PlaceDetails" component={PlaceDetail} />
      <Stack.Screen name="addPlace" component={addPlace} />
    </Stack.Navigator>
  );
}

export default RootStack;