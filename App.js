import 'react-native-gesture-handler';

import React from 'react';
// import AppStack from './src/pages/Home/Home';
import RootStack from './src/pages/navigation/RootStack';
import {NavigationContainer} from '@react-navigation/native';

import {SearchContextProvider} from './src/context/SearchContext';

const App = () => {
  return (
    <NavigationContainer>
      <SearchContextProvider>
        <RootStack />
      </SearchContextProvider>
    </NavigationContainer>
  );
};

export default App;
