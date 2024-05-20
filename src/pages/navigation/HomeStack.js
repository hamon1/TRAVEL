import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../Home/HomeScreen';
import PlaceDetail from '../Home/PlaceDetails';
import reviewScreen from '../Home/ReviewScreen';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PlaceDetails"
        component={PlaceDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="reviewScreen"
        component={reviewScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
