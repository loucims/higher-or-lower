import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import MyProfileScreen from './MyProfileScreen';
import LeaderboardScreen from './LeaderboardScreen';
import ChooseCategory from './ChooseCategory';
import Game from './Game';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useTabBarState } from '../contexts/TabBarStateContext';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator()



function GameplayLoop({route, navigation}) {
  const {setHideTabBar} = useTabBarState()

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route); // Get Nested Route Name
    console.log("routeName:", routeName)
    if (routeName === 'Game') {
      setHideTabBar(true)
    } else {
      setHideTabBar(false)
    }
  }, [navigation, route])


  return (
    <Stack.Navigator>
      <Stack.Screen name="Category" options={{headerShown: false, presentation: "modal"}} component={ChooseCategory}/>
      <Stack.Screen name="Game" options={{headerShown: false, animation: 'slide_from_bottom', gestureEnabled: false}} component={Game}/>
    </Stack.Navigator>
  );
}


const HomeScreen = ({navigation}) => {
    const { hideTabBar } = useTabBarState()

    return (
      <Tabs.Navigator>
          <Tabs.Screen name="Jugar" options={{headerShown: false, tabBarStyle: hideTabBar && {display: 'none', height: 0}}} component={GameplayLoop}/>
          <Tabs.Screen name="Leaderboard" options={{headerShown: false}} component={LeaderboardScreen} />
          <Tabs.Screen name="My Profile" options={{headerShown: false}} component={MyProfileScreen} />
      </Tabs.Navigator>
    )
}


export default HomeScreen