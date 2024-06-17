import { StyleSheet, Text, View, Platform, StatusBar, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient'

const styles = StyleSheet.create({
    mainContainer: {
        position: 'relative',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    header: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        width: '100%',
        height: 50,
        paddingLeft: 15,
        zIndex: 1,
        borderRadius: 50,
    },
    textSecondary: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 'semi-bold',
        color: 'white'
    },
    optionContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '50%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageGradient: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    vsCircle: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'black',
        borderWidth: 2,
        borderColor: 'white',
        top: '50%',
        left: '50%',
        marginTop: -40,
        marginLeft: -40, // Half of the width to center horizontally
        zIndex: 1
    },
    optionText: {
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    optionTextSecondary: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 'semi-bold',
        color: 'white'
    },
    optionValue: {
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white'
    
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 10
    
    }
});


const Game = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const topPadding = Platform.OS === 'android' ? StatusBar.currentHeight : insets.top;

    return (
    <>
    {topPadding > 0 && <View style={{width: '100%', height: topPadding, backgroundColor: 'black'}}/>}
    <View style={styles.mainContainer}>
        <View style={styles.header}>
            <View onTouchEnd={() => {navigation.navigate('Category')}}>
                <Text style={styles.textSecondary}>X  Ir atras</Text>
            </View>
            <View style={{flexDirection: 'row', paddingRight: 5, paddingTop: 2, gap: 15}}>
                <Text style={styles.textSecondary}>High score: 1</Text>
                <Text style={styles.textSecondary}>Score: 0</Text>
            </View>
        </View>

        <View style={styles.optionContainer}>
            <ImageBackground source={require('../assets/joker.png')} resizeMode="cover" style={styles.image} imageStyle={{borderTopEndRadius: 20, borderTopStartRadius: 20,}}>
                <LinearGradient colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.8)']} style={styles.imageGradient}>
                    <Text style={styles.optionText}>"Joker"</Text>
                    <Text style={styles.optionTextSecondary}>tiene</Text>
                    <Text style={styles.optionValue}>160,432</Text>
                    <Text style={styles.optionTextSecondary}>visitas promedio por mes</Text>
                </LinearGradient>
            </ImageBackground>

        </View>

        <View style={styles.vsCircle}>
            <Text style={styles.textSecondary}>VS</Text>
        </View>

        <View style={styles.optionContainer}>
            <ImageBackground source={require('../assets/2012.png')} resizeMode="cover" style={styles.image}>
                <LinearGradient colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.3)']} style={styles.imageGradient}>
                    <Text style={[styles.optionText, {marginBottom: '25px'}]}>"2012, el Apocalipsis"</Text>
                    <Text style={styles.optionTextSecondary}>tiene</Text>
                    <View style={styles.button}>
                        <Text>MAS ^</Text>
                    </View>
                    <Text style={styles.optionTextSecondary}>o</Text>
                    <View style={styles.button}>
                        <Text>MENOS v</Text>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
        
    </View>
    </>

    )
}

export default Game