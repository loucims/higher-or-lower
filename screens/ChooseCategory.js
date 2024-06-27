import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import {API_URL} from "@env"
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../store/selectors/auth';
import { Image } from 'expo-image';

import { TouchableOpacity } from 'react-native';

const ChooseCategory = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const token = useSelector(selectAuthToken)

    const [isTimedMode, setIsTimedMode] = useState(false);

    const handleModeToggle = () => {
        setIsTimedMode(prevMode => !prevMode);
    };


    const fetchQuestions = async (genre = 'movie', pageSize = 5, lastKey = '') => {
        try {
            const fetchOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            };
    
            const params = new URLSearchParams({
                pageSize: pageSize,
                lastKey: lastKey
            });
            
            const response = await fetch(`${API_URL}/options/genre/${genre}/paginated?${params}`, fetchOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result.message.data)
            return result.message
        } catch (error) {
            console.log(error);
        }
    }

    const fetchProfile = async () => {
        try {
            const fetchOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            };
    
            const response = await fetch(`${API_URL}/user/profile`, fetchOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result)
            return result.message;
        } catch (error) {
            console.log(error);
        }
    }


    const handleGenrePress = async (genre) => {
        if (!token) throw new Error('No token found')
        setLoading(true)

        
        const profile = await fetchProfile()
        let highscore = profile.stat.recordNormal
        if (isTimedMode) highscore = profile.stat.recordTimer
        const userID = profile.id

        const result = await fetchQuestions(genre, 5, '')
        if (result.data.length == 0 || !result) {
            setLoading(false)
            return console.warn('No questions found')

        } 

        setLoading(false)
        navigation.navigate('Game', {
            genre: genre,
            limit: 10,
            startAfterKey: result.lastKey,
            initData: result.data,
            initHighscore: highscore,
            userID: userID,
            isTimed: isTimedMode,
        })
    }

    if (loading) return (
        <View style={styles.screen}>

            <Image
                source={require('../assets/logo.png')} 
                style={styles.image}
                resizeMode="contain" 
            />
            <ActivityIndicator size="large" color="black" style={styles.spinner}/>
            <Text style={styles.text}>Loading...</Text>
        </View>
    )


    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo.png')} 
                style={{position: 'absolute', top: 15, left: 0, width: 95, aspectRatio: 1, resizeMode: 'contain', marginTop: 10 }}
            />
            <Text style={styles.title}>Jugar</Text>
            <Text style={styles.subtitle}>Elegir categoría</Text>
            <View style={styles.toggleContainer}>
                <TouchableOpacity onPress={handleModeToggle} style={[styles.toggleButton, isTimedMode && styles.activeMode]}>
                    <Text style={styles.toggleText}>Modo Timeado</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleModeToggle} style={[styles.toggleButton, !isTimedMode && styles.activeMode]}>
                    <Text style={styles.toggleText}>Normal</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.categoryContainer}>
                <TouchableOpacity onPress={() => handleGenrePress('movie')} style={[styles.categoryButton]}>
                    <Text style={styles.categoryText}>Películas</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleGenrePress('game')} style={[styles.categoryButton]}>
                    <Text style={styles.categoryText}>Videojuegos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20
    },
    toggleContainer: {
        flexDirection: 'row',
        marginBottom: 20
    },
    toggleButton: {
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000'
    },
    activeMode: {
        backgroundColor: '#ddd'
    },
    toggleText: {
        fontSize: 16
    },
    categoryContainer: {
        width: '100%',
        alignItems: 'center'
    },
    categoryButton: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
        width: '80%',
        alignItems: 'center'
    },
    selectedCategory: {
        backgroundColor: '#ddd'
    },
    categoryText: {
        fontSize: 16
    },


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

export default ChooseCategory