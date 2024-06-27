// LoadingScreen.js
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useEffect } from 'react';

const LoadingScreen = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);

    return (
        <View style={styles.screen}>

            <Image
                source={require('../assets/logo.jpg')} 
                style={styles.image}
                resizeMode="contain" 
            />
            <ActivityIndicator size="large" color="black" style={styles.spinner}/>
            <Text style={styles.text}>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },

    image: {
        width: '80%', 
        height: '40%', 
        marginBottom: 20 
      },

    spinner: {
        marginTop: 20 
      },

    text: {
        marginTop: 20,
        fontSize: 18,
        color: '#000'
    }
});

export default LoadingScreen;