import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Button,
    ActivityIndicator,
    Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../components/Input';
import Card from '../components/Card';
import * as authActions from '../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const LoginScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
        
    });
    
    

    useEffect(() => {
        if (error) {
            Alert.alert('Ocurrio un error', error, [{ text: 'Ok' }]);
        }
    }, [error]);

    const authHandler = async () => {
        let action;
        if (isSignup) {
            action = authActions.signup(
                formState.inputValues.email,
                formState.inputValues.password
            );
            
        } else {
            action = authActions.login(
                formState.inputValues.email,
                formState.inputValues.password
            );
           
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('LoadingScreen');
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };
  

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );
   

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="E-Mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Por favor ingrese un E-Mail valido"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Por favor ingrese una clave valida"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <View style={styles.buttonContainer}>
                            {isLoading ? (
                                <ActivityIndicator size="small"/>
                            ) : (
                                <Button
                                    title={isSignup ? 'Sign Up' : 'Login'}
                                    onPress={authHandler}
                                />
                            )}
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                                onPress={() => {
                                    setIsSignup(prevState => !prevState);
                                }}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};
console.log('COMO TERMINO', LoginScreen);



const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default LoginScreen;






/*export default function LoginScreen({navigation}) {
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
  }*/


/*const styles = StyleSheet.create({
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
});*/