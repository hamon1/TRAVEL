import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import AdminScreen from 'screens/admin/AdminScreen';
import { Home } from 'screens/Home';
import { CommonType } from 'types/common/CommonType';
import BottomTabBar from './BottomTab';

/**
 * Bottom TabBar를 사용하는 경우의 Navigation
 * @param appStateType 
 * @returns 
 */
const BottomTabNavigator = (appStateType: any) => {
    const Tab = createBottomTabNavigator<CommonType.RootStackPageList>();

    return (
        // TabBar의 UI는 BottomTabBar 화면에서 관리합니다.
        <Tab.Navigator initialRouteName='home' tabBar={props => <BottomTabBar {...props} />} >
            {/* 메인 페이지 */}
            <Tab.Screen name="home">
                {(props) => <Home {...props} appState={appStateType.appState} />}
            </Tab.Screen>
            {/* 관리자 페이지 */}
            <Tab.Screen name="adminScreen" >
                {(props) => <AdminScreen {...props} appState={appStateType.appState} />}
            </Tab.Screen>

        </Tab.Navigator>
    )
}
export default BottomTabNavigator;