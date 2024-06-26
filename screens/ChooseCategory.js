
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
                    'Cookie': `token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjozLCJuYW1lIjoiSnVhbmNpdG8zIn0sImlhdCI6MTcxOTI3MDY1OCwiZXhwIjoxNzE5MzU3MDU4fQ._yv1iCys3O7BL-qr-WPO-KxVdTmiVTaX7fHSzlqU3EA`,
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
        setLoading(false)
    }

    const fetchHighscore = async () => {
        try {
            const fetchOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjozLCJuYW1lIjoiSnVhbmNpdG8zIn0sImlhdCI6MTcxOTI3MDY1OCwiZXhwIjoxNzE5MzU3MDU4fQ._yv1iCys3O7BL-qr-WPO-KxVdTmiVTaX7fHSzlqU3EA`,
                },
            };
    
            const response = await fetch(`${API_URL}/user/profile`, fetchOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
    
            return result.message.stat.recordNormal;
        } catch (error) {
            console.log(error);
        }
    }


    const handleGenrePress = async (genre) => {
        const highscore = await fetchHighscore()
        console.log(highscore)
        const result = await fetchQuestions(genre, 5, '')
        if (!result) return console.log('Error fetching data')
        navigation.navigate('Game', {
            genre: genre,
            limit: 10,
            startAfterKey: result.lastKey,
            initData: result.data,
            initHighscore: highscore
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