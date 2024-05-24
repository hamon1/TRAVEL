import 'react-native-gesture-handler';

import React from 'react';
// import AppStack from './src/pages/Home/Home';
import RootStack from './src/pages/navigation/RootStack';
import {NavigationContainer} from '@react-navigation/native';
import SignInScreen from './mysrc/screens/SignInScreen';

const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default App;
