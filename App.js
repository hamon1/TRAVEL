// // /**
// //  * Copyright (c) Meta Platforms, Inc. and affiliates.
// //  *
// //  * This source code is licensed under the MIT license found in the
// //  * LICENSE file in the root directory of this source tree.
// //  *
// //  * @format
// //  */

// // import React from 'react';
// // import {
// //   SafeAreaView,
// //   ScrollView,
// //   StatusBar,
// //   StyleSheet,
// //   Text,
// //   useColorScheme,
// //   View,
// // } from 'react-native';

// // import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

// // function App(): React.JSX.Element {
// //   const isDarkMode = useColorScheme() === 'dark';

// //   const backgroundStyle = {
// //     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
// //   };

// //   return (
// //     <SafeAreaView style={backgroundStyle}>
// //       <StatusBar
// //         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
// //         backgroundColor={backgroundStyle.backgroundColor}
// //       />
// //       <ScrollView
// //         contentInsetAdjustmentBehavior="automatic"
// //         style={backgroundStyle}>
// //         <Header />
// //         <View
// //           style={{
// //             backgroundColor: isDarkMode ? Colors.black : Colors.white,
// //           }}>
// //           <Text style={styles.title}>Hello, World!</Text>
// //         </View>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   title: {
// //     fontSize: 24,
// //     fontWeight: '600',
// //   },
// // });

// // export default App;
// import React from 'react';
// import {Text, View, StyleSheet} from 'react-native';

// const HelloWorldApp = () => {
//   return (
//     <View style = {styles.container}>
//       <Text>Hello World!</Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex : 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   }
// });

import 'react-native-gesture-handler';

import React from 'react';
// import AppStack from './src/pages/Home/Home';
import RootStack from './src/pages/navigation/RootStack';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default App;
