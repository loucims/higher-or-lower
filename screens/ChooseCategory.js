
import { StyleSheet, Text, View } from 'react-native';

const ChooseCategory = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Juego</Text>
            <Text>Elegir categoria</Text>
            <Text onPress={() => {navigation.navigate('Game')}}>Peliculas</Text>
            <Text onPress={() => {navigation.navigate('Game')}}>Videojuegos</Text>
        </View>
    )
}

export default ChooseCategory