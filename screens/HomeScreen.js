import { StyleSheet, Text, View, Image } from 'react-native';
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


const Logo = () => (
  <Image
    source={require('../assets/logo.jpg')} 
    style={{ width: 120, height: 50, resizeMode: 'contain', marginTop: 10 }}
  />
);

const CustomStackNavigator = ({ children }) => (
  <View style={styles.container}>
    {children}
  </View>
);


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

    <CustomStackNavigator>
    <Stack.Navigator>
      <Stack.Screen name="Category" options={{headerShown: false, presentation: "modal"}} component={ChooseCategory}/>
      <Stack.Screen name="Game" options={{headerShown: false, animation: 'slide_from_bottom', gestureEnabled: false}} component={Game}/>
    </Stack.Navigator>
    </CustomStackNavigator>
  );
}


const HomeScreen = ({navigation}) => {
    const { hideTabBar } = useTabBarState()

    return (
      <View style={styles.container}>
      <Logo />
      <Tabs.Navigator>
          <Tabs.Screen name="Jugar" options={{headerShown: false, tabBarStyle: hideTabBar && {display: 'none', height: 0}}} component={GameplayLoop}/>
          <Tabs.Screen name="Leaderboard" options={{headerShown: false}} component={LeaderboardScreen} />
          <Tabs.Screen name="My Profile" options={{headerShown: false}} component={MyProfileScreen} />
      </Tabs.Navigator>
      </View>
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