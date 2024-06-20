import { Platform } from 'react-native';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import TabBarStateProvider from './contexts/TabBarStateContext';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

const App = () => {

  const [fontsLoaded, fontError] = useFonts({
    'Inter': require('./assets/fonts/Inter-VariableFont.ttf'),
  });

  useEffect(() => {
    if (Platform.OS === "ios") {
      enableScreens(false);
    }
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TabBarStateProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
          <Stack.Screen name="Home" options={{headerShown: false, gestureEnabled: false}} component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TabBarStateProvider>

  );
}

export default App

