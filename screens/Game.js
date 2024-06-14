import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',

        width: '100%',
        height: 50,
        paddingLeft: 15
    },
});


const Game = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    const topPadding = Platform.OS === 'android' ? StatusBar.currentHeight : insets.top;

    return (
    <View style={[styles.mainContainer, { paddingTop: topPadding }]}>
        <View style={styles.header}>
            <Text>X Ir atras</Text>
        </View>
    </View>
    )
}

export default Game