// import React from 'react';

// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {HomeStackNavigator} from './StackNavigation';
// import {ProfileStackNavigator} from './StackNavigation';
// import Icon from 'react-native-vector-icons/Ionicons';

// const Tab = createBottomTabNavigator();

// const BottomTabNavigator = () => {
//   return (
//     <Tab.Navigator initialRouteName="HomeStack">
//       <Tab.Screen
//         name="HomeStack"
//         component={HomeStackNavigator}
//         options={{
//           headerShown: false,
//           // eslint-disable-next-line react/no-unstable-nested-components
//           tabBarIcon: ({color, size}) => (
//             <Icon name="home-outline" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="ProfileStack"
//         component={ProfileStackNavigator}
//         options={{
//           headerShown: false,
//           // eslint-disable-next-line react/no-unstable-nested-components
//           tabBarIcon: ({color, size}) => (
//             <Icon name="map-outline" color={color} size={size} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default BottomTabNavigator;

// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {Text} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const Tab = createBottomTabNavigator();

// function HomeScreen() {
//   return <Text>Home</Text>;
// }

// function SearchScreen() {
//   return <Text>Search</Text>;
// }

// function NotificationScreen() {
//   return <Text>Notification</Text>;
// }

// function MessageScreen() {
//   return <Text>Message</Text>;
// }

// function BottomTabNavigationApp() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator initialRouteName="Home">
//         <Tab.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             title: '홈',
//             tabBarIcon: ({color, size}) => (
//               <Icon name="home" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Search"
//           component={SearchScreen}
//           options={{
//             title: '알림',
//             tabBarIcon: ({color, size}) => (
//               <Icon name="notifications" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Notification"
//           component={NotificationScreen}
//           options={{
//             title: '검색',
//             tabBarIcon: ({color, size}) => (
//               <Icon name="search" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Message"
//           component={MessageScreen}
//           options={{
//             title: '메시지',
//             tabBarIcon: ({color, size}) => (
//               <Icon name="message" color={color} size={size} />
//             ),
//           }}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// export default BottomTabNavigationApp;