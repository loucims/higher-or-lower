import { StyleSheet, Text, View } from 'react-native';
import { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

import ChooseCategory from './ChooseCategory';
import Game from './Game';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator()

function GameplayLoop({navigation}) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Category" options={{headerShown: false}} component={ChooseCategory}/>
        <Stack.Screen name="Game" options={{headerShown: false}} component={Game}/>
      </Stack.Navigator>
    );
}
function Leaderboard() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Leaderboard</Text>
      </View>
    );
}

const HomeScreen = ({navigation}) => {
    // Esta navegacion es la ocupada de cambiar entre las pantallas principales como leaderboard, el gameplay loop, perfil, etc.

    return (
        <Tabs.Navigator>
            <Tabs.Screen name="Juego" options={{headerShown: false}} component={GameplayLoop} />
            <Tabs.Screen name="Leaderboard" options={{headerShown: false}} component={Leaderboard} />
        </Tabs.Navigator>
    )
}


export default HomeScreen