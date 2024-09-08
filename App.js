/*
import 'react-native-gesture-handler';

import React from 'react';
// import AppStack from './src/pages/Home/Home';
import RootStack from './src/pages/navigation/RootStack';
import { NavigationContainer } from '@react-navigation/native';
import { UserContextPovider } from './src/components/UserContext';
import {SearchContextProvider} from './src/context/SearchContext';


const App = () => {
  return (
    <UserContextPovider>
      <NavigationContainer>
        <SearchContextProvider>
          <RootStack />
        </SearchContextProvider>
      </NavigationContainer>
    </UserContextPovider>
  );
};

export default App;
*/
import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {SearchContextProvider} from './src/context/SearchContext';

import LoginScreen from './src/pages/Login/screens/LoginScreen';
import SignupScreen from './src/pages/Login/screens/SignupScreen';
import { Colors } from './src/pages/Login/constants/styles';
import AuthContextProvider, { AuthContext } from './src/pages/Login/store/auth-context';
import HomeScreen from './src/pages/Home/HomeScreen';
import addPlace from './src/pages/Plans/PlanScreen'
import addPlan from './src/pages/Plans/PlanListScreen';
import ChatScreen from './src/pages/Chat/ChatScreen';
import PlanScreen from './src/pages/Plans/PlanScreen';
import MainTab from './src/pages/navigation/MainTabs';
import PlanStack from './src/pages/navigation/PlanStack';

import PlaceSearchScreen from './src/pages/Plans/screens/PlaceSearchScreen';

// import PlanPlaceScreen from './src/pages/Plans/screens/PlanPlaceScreen';
// import PlanOherScreen from './src/pages/Plans/screens/PlanOtherScreen';
// import PlanRestScreen from './src/pages/Plans/screens/PlanRestScreen';
// import PlanTransScreen from './src/pages/Plans/screens/PlanTransScreen';
// import PlanRantalScreen from './src/pages/Plans/screens/PlanRantalScreen';

// import CalendarView from './src/components/CalendarView';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
        initialRouteName={HomeScreen}
        // etachInactiveScreens={false}
      />
      <Stack.Screen name="chatScreen" component={ChatScreen} 
        options={{title: '채팅창'}}
      />
      <Stack.Screen
        name='PlanStack'
        component={PlanStack}
        options={{headerShown: false}}
      />
      <Stack.Screen name="addPlan" component={addPlan} 
        options={{title: '계획 목록', headerBackTitleVisible: (false)}}
      />
      <Stack.Screen name="planScreen" component={PlanScreen} 
         options={{title: '', headerBackTitleVisible: (false)}}
      />
       <Stack.Screen 
      name="PlaceSearchScreen" 
      component={PlaceSearchScreen}
      options={{title:''}}
      />
      {/* <Stack.Screen 
      name="PlanPlaceScreen" 
      component={PlanPlaceScreen}
      options={'planPlace'}
      />
      <Stack.Screen 
        name="PlanOtherScreen" 
        component={PlanOherScreen} 
        options={{title: ''}}
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
      /> */}
      {/*
      <Stack.Screen name="planScreen" component={PlanScreen} 
         options={{title: ''}}
      />
      
      <Stack.Screen
        name="Plan_Place_Setting"
        component={Plan_Place_Setting}
        options={{title: 'PlanPlace'}}
      />
      <Stack.Screen
        name="CalendarView"
        component={CalendarView}
      />
      */}
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <SearchContextProvider>
          <Navigation />
        </SearchContextProvider>
      </AuthContextProvider>
    </>
  );
}
