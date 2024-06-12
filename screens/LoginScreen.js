import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: '#fff',
    },
    title: {
      fontFamily: 'Inter',
      fontSize: 32,
      fontWeight: 'bold',
    },
    loginTextContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '80%',
      height: 65,
      marginTop: 50,
    },
    loginText: {
      fontFamily: 'Inter',
      fontSize: 18,
      fontWeight: 'bold',
    },
    loginSubtext: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: 'semi-bold',
    },
    inputsContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '80%',
      height: '20%',
      marginTop: 50,
    },
    inputContainer: {
      width: '100%',
      height: 50,
      borderColor: '#E0E0E0',
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: 10,
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: 'bold',
    },
    loginButton: {
      width: '100%',
      height: 50,
      backgroundColor: 'black',
      borderRadius: 8,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginButtonText: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    }
});

export default function LoginScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>MasoMenos!</Text>

        <View style={styles.loginTextContainer}>
          <Text style={styles.loginText}>Iniciar sesión</Text>
          <Text style={styles.loginSubtext}>Ingrese su usuario y contraseña</Text>
        </View>

        <View style={styles.inputsContainer}>
          <TextInput 
            style={styles.inputContainer}
            placeholder='Usuario'
          />
          <TextInput 
            style={styles.inputContainer}
            placeholder='Contraseña'

          />
          <View style={styles.loginButton} onTouchStart={() => {navigation.navigate('Home')}}>
            <Text style={styles.loginButtonText}>Iniciar sesión</Text>
          </View>
        </View>

        <View>

        </View>
      </View>
    );
  }
  