import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tabs = createBottomTabNavigator()

function Test1() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Leaderboard</Text>
      </View>
    );
}
function Test2() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Game</Text>
      </View>
    );
}

const HomeScreen = ({navigation}) => {
    // Esta navegacion es la ocupada de cambiar entre las pantallas principales como leaderboard, el juego, perfil, etc.

    return (
        <Tabs.Navigator>
            <Tabs.Screen name="Test1" component={Test1} />
            <Tabs.Screen name="Test2" component={Test2} />
        </Tabs.Navigator>
    )
}


export default HomeScreen