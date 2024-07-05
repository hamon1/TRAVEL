import 'react-native-gesture-handler';

import React from 'react';
// import AppStack from './src/pages/Home/Home';
import RootStack from './src/pages/navigation/RootStack';
import {NavigationContainer} from '@react-navigation/native';
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
