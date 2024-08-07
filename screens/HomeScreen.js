import { StyleSheet, Text, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyProfileScreen from './MyProfileScreen';
import LeaderboardScreen from './LeaderboardScreen';
import ProfileScreen from './ProfileScreen';
import ChooseCategory from './ChooseCategory';
import Game from './Game';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useTabBarState } from '../contexts/TabBarStateContext';

import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const LeaderboardStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator()


function LeaderboardStackNavigator() {
  return (
    <LeaderboardStack.Navigator>
      <LeaderboardStack.Screen name="LeaderboardScreen" options={{headerShown: false}} component={LeaderboardScreen}/>
      <LeaderboardStack.Screen name="ProfileScreen" options={{headerShown: false}} component={ProfileScreen}/>
    </LeaderboardStack.Navigator>
  );
}



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


const HomeScreen = () => {
    const { hideTabBar } = useTabBarState()

    return (
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Jugar') {
                  iconName = focused
                      ? 'game-controller'
                      : 'game-controller-outline';
              } else if (route.name === 'Leaderboard') {
                  iconName = focused
                      ? 'trophy'
                      : 'trophy-outline';
              } else if (route.name === 'My Profile') {
                  iconName = focused
                      ? 'person'
                      : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: hideTabBar ? { display: 'none', height: 0 } : {},
      })}
      >
          <Tabs.Screen name="Jugar" options={{
            headerShown: false, tabBarStyle: hideTabBar && {display: 'none', height: 0}}} component={GameplayLoop}/>
          <Tabs.Screen name="Leaderboard" options={{headerShown: false}} component={LeaderboardStackNavigator} />
          <Tabs.Screen name="My Profile" options={{headerShown: false}} component={MyProfileScreen}/>
      </Tabs.Navigator>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});


export default HomeScreen