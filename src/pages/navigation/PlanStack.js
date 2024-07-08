import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import addPlan from '../Plans/PlanListScreen';

const Stack = createNativeStackNavigator();

function PlanStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="addPlan" component={addPlan} 
            options={{title: '계획 목록'}}
          />
    </Stack.Navigator>
  );
}

export default PlanStack;
