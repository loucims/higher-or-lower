import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import TabBarStateProvider from './contexts/TabBarStateContext';

const Stack = createNativeStackNavigator();

const App = () => {
  // Esta navegacion es solo para el flow de login, registro, y eventualmente la pantalla home

  return (
    <TabBarStateProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
          <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TabBarStateProvider>
  );
}

export default App

