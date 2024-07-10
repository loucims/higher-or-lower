import { Platform } from 'react-native';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import { Provider } from 'react-redux';
import TabBarStateProvider from './contexts/TabBarStateContext';
import context from './contexts/context';
import { useFonts } from 'expo-font';
import { useState } from 'react';

import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from './store/selectors/auth';

const MainApp = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Platform.OS === "ios") {
      enableScreens(false);
    }
  }, []);

  return (
    <>
      {loading ?
      <LoadingScreen setLoading={setLoading}/>
      :
        isLoggedIn ? 
        <HomeScreen />
        :
        <LoginScreen />
      }
    </>
  );
}


const App = () => {

  const [fontsLoaded, fontError] = useFonts({
    'Inter': require('./assets/fonts/Inter-VariableFont.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TabBarStateProvider>
      <Provider store={context}>
        <NavigationContainer>
          <MainApp/>
        </NavigationContainer>
      </Provider>
    </TabBarStateProvider>

  );
}

export default App

        {/* <Stack.Navigator>
          <Stack.Screen name="Loading" options={{ headerShown: false }} component={LoadingScreen} />
          <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
          <Stack.Screen name="Home" options={{headerShown: false, gestureEnabled: false}} component={HomeScreen} />
        </Stack.Navigator> */}