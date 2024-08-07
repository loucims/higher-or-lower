import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Button,
    ActivityIndicator,
    Alert,
    Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { logIn } from '../store/reducers/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Input from '../components/Input';
import Card from '../components/Card';
import { signup, login, authenticate } from '../store/actions/auth';


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


const LoginScreen = () => {
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
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token } = transformedData;
            if (token) {
                dispatch(authenticate(token));
                dispatch(logIn());
            }
        };
        tryLogin();
    }, [dispatch]);


    useEffect(() => {
        if (error) {
            Alert.alert('Ocurrio un error', error, [{ text: 'Ok' }]);
        }
    }, [error]);

    const authHandler = async () => {
        if (!formState.inputValues.email || !formState.inputValues.password) {
            Alert.alert('Invalid input!', 'Please enter a valid email and password.', [{ text: 'Okay' }]);
            return;
        }

        let action;
        if (isSignup) {
            action = signup({
                email: formState.inputValues.email,
                password: formState.inputValues.password
            });
        } else {
            action = login({
                email: formState.inputValues.email,
                password: formState.inputValues.password
            });
        }
        setError(null);
        setIsLoading(true);
        try {
            const resultAction = await dispatch(action).unwrap();
            console.log('Login/Signup successful', resultAction);
            if (resultAction) {
                console.log('Navigating to LoadingScreen');
                dispatch(logIn());
            }
        } catch (err) {
            console.error('Error during login/signup', err);
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
            <LinearGradient colors={['#ffffff', '#ffffff']} style={styles.gradient}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/logo.png')} style={styles.logo} />
                </View>
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
                                <ActivityIndicator size="small" />
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
    logoContainer: {
        marginBottom: 20,
        alignItems: 'center'
    },
    logo: {
        width: 300,
        height: 300
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
