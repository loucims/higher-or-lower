
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import {API_URL} from "@env"

const ChooseCategory = ({ navigation }) => {

    const [loading, setLoading] = useState(false)

    const fetchQuestions = async (genre = 'movie', pageSize = 5, lastKey = '') => {
        setLoading(true)
        try {
            const fetchOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
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
            console.log(result)
            return result.message
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    const handleGenrePress = async (genre) => {
        const result = await fetchQuestions(genre, 5, '')
        if (!result) return console.log('Error fetching data')
        navigation.navigate('Game', {
            genre: genre,
            limit: 10,
            startAfterKey: result.lastKey,
            initData: result.data
        })
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Juego</Text>
            <Text>Elegir categoria</Text>
            <Text onPress={() => handleGenrePress('movie')}>Peliculas</Text>
            <Text onPress={() => handleGenrePress('movie')}>Videojuegos</Text>
        </View>
    )
}

export default ChooseCategory