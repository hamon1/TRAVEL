import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import PlanOherScreen from '../Plans/screens/PlanOtherScreen';
// import PlanRantalScreen from '../Plans/screens/PlanRantalScreen';
// import PlanTransScreen from '../Plans/screens/PlanTransScreen';
// import PlanRestScreen from '../Plans/screens/PlanRestScreen';
// import Plan_Place_Setting from '../Plans/screens/PlanPlaceScreen';
// import CalendarView from '../../components/CalendarView';
// import addPlan from '../Plans/PlanListScreen';
// import PlanScreen from '../Plans/PlanScreen';

const Stack = createNativeStackNavigator();

function PlanStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="addPlan" component={addPlan} 
        options={{title: '계획 목록'}}
      />
      <Stack.Screen name="planScreen" component={PlanScreen} 
         options={{title: '계획표'}}
      />
      <Stack.Screen
        name="Plan_Place_Setting"
        component={Plan_Place_Setting}
        options={{title: 'PlanPlace'}}
      />
      <Stack.Screen
        name="PlanOtherScreen"
        component={PlanOherScreen}
        options={{title: 'PlanOther'}}
      />
      <Stack.Screen
        name="PlanRantalScreen"
        component={PlanRantalScreen}
        options={{title: 'PlanRantal'}}
      />
        <Stack.Screen
        name="PlanRestScreen"
        component={PlanRestScreen}
        options={{title: 'PlanRest'}}  
      />
      <Stack.Screen
        name="PlanTransScreen"
        component={PlanTransScreen}
        options={{title: 'PlanTransScreen'}}
      />
      <Stack.Screen
        name="CalendarView"
        component={CalendarView}
      />
    </Stack.Navigator>
  );
}

export default PlanStack;
