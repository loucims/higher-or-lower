import { StyleSheet, Text, View, Platform, StatusBar, ImageBackground, Animated, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient'
import { useState, useRef, useEffect } from 'react';
import { Image } from 'expo-image';
import {API_URL} from "@env"
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../store/selectors/auth';


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
        position: 'relative',
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
    imageAbsolute: {
        position: 'absolute',
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
    
    },
    lostScreenContainer: {
        display: 'flex',
        height: '100%',
        width: '100%',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
    },
    lostMainText: {
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white'
    },
    timer: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 15,
        right: 15,
        zIndex: 1,
    }

});



const Game = ({ navigation, route }) => {
    const token = useSelector(selectAuthToken)

    const insets = useSafeAreaInsets();
    const topPadding = Platform.OS === 'android' ? StatusBar.currentHeight : insets.top;
    const [optionHeight, setOptionHeight] = useState(0);

    const [loading, setLoading] = useState(false)
    const { genre, limit, startAfterKey, initData, initHighscore, userID } = route.params;
    const [firstOption, secondOption, ...restOptions] = initData || [];

    const [lastKey, setLastKey] = useState(startAfterKey);
    const [optionFeed, setOptionFeed] = useState(restOptions);
    const [options, setOptions] = useState([firstOption, secondOption]);

    const [highScore, setHighScore] = useState(initHighscore || 0);
    const [totalGuesses, setTotalGuesses] = useState(0);
    const [score, setScore] = useState(0);
    const [lost, setLost] = useState(false);


    const [searchCount, setSearchCount] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const [vsMessage, setVsMessage] = useState('VS');
    const [vsColor, setVsColor] = useState('black');
    const topOptionAnim = useRef(new Animated.Value(0)).current;
    const bottomOptionAnim = useRef(new Animated.Value(0)).current;
    const optionsOpacity = useRef(new Animated.Value(1)).current;

    const [time, setTime] = useState(150); // 2:30 in seconds (2 * 60 + 30)
    const [isActive, setIsActive] = useState(true);
  
    useEffect(() => {
      let interval = null;
      if (isActive && time > 0) {
        interval = setInterval(() => {
          setTime((time) => time - 1);
        }, 1000);
      } else if (time === 0) {
        clearInterval(interval);
        onTimerEnd();
      }
      return () => clearInterval(interval);
    }, [isActive, time]);
  
    const onTimerEnd = () => {
      console.log('Timer ended!');
      // Do something when the timer ends
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };
    


    const fetchQuestions = async (genre = 'movie', pageSize = 10, paginationLastKey = '') => {
        setLoading(true);
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
                lastKey: paginationLastKey
            });
    
            const response = await fetch(`${API_URL}/options/genre/${genre}/paginated?${params}`, fetchOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
    
            const newOptions = result?.message?.data ?? [];
            const newLastKey = result?.message?.lastKey ?? '';
    
            console.log(result.message);
    
            // If the new options are empty, fetch from the beginning
            if (newOptions.length === 0) {
                await fetchQuestions(genre, pageSize); // Recursive call with no lastKey
            } else {
                setOptionFeed(prev => [...prev, ...newOptions]);
                setLastKey(newLastKey);
            }
    
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const updateHighScore = async (newScore) => {
        try {
            const fetchOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({
                    value: newScore
                }),
            };
    
            const response = await fetch(`${API_URL}/stat/updateNormalRecord/${userID}`, fetchOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
    
            console.log(result.message);
    
        } catch (error) {
            console.log(error);
        }
    }

    const addTotalGuesses = async (totalGuessesInRound) => {
        try {
            const fetchOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({
                    value: totalGuessesInRound
                }),
            };
    
            const response = await fetch(`${API_URL}/stat/updateTotalGuesses/${userID}`, fetchOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
    
            console.log(result.message);
    
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // Prefetch next image when options change
        const prefetchNextImage = async () => {

            const nextImage = optionFeed[0].image;

            if (nextImage) {
                console.log(nextImage)
                await Image.prefetch(nextImage);
            }
        };

        prefetchNextImage();
    }, [options]);


    const countUpAnimation = (targetValue, callback) => {
        // Los mejores valores de iOS son 100 y 10, los de Android son 10 y 10
        let count = 0;
        const interval = setInterval(() => {
            if (count < targetValue) {
                count += Math.ceil(targetValue / 100);
                setSearchCount(count);
            } else {
                clearInterval(interval);
                setSearchCount(targetValue);
                if (callback) {
                    callback();
                }
            }
        }, 10);
    };

    const handlePressHigherLower = (guess) => {
        setTotalGuesses(totalGuesses + 1);
        let isCorrect
        if (guess === 'higher') {
            isCorrect = options[0].value <= options[1].value;
        } else if (guess === 'lower') {
            isCorrect = options[0].value >= options[1].value;
        }
        
        setShowResult(true)

        const reloadOptionsAnimation = (isCorrect) => {
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(topOptionAnim, {
                        toValue: -optionHeight,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(bottomOptionAnim, {
                        toValue: -optionHeight,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]),
            ]).start(() => {

                // Fade out for loading
                Animated.timing(optionsOpacity, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }).start(async () => {

                    if (!isCorrect) {
                        handleLoss();
                    }

                    const [nextOption, ...remainingOptions] = optionFeed;

                    // Update options
                    setOptions([
                        options[1],
                        nextOption
                    ]);

                    // Update optionFeed
                    setOptionFeed(remainingOptions);

                    // Check if optionFeed is too low and fetch more options if needed
                    if (remainingOptions.length <= 2) {
                        console.log("Fetching more options, ran out of options")
                        fetchQuestions(genre, limit, lastKey);
                    }

                    // Reset anim
                    topOptionAnim.setValue(0);
                    bottomOptionAnim.setValue(0);
                    setShowResult(false);


                    // Fade in for loading
                    Animated.timing(optionsOpacity, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }).start(() => {
                        setVsMessage('VS');
                        setVsColor('black');
                    });});
            });
        };

        countUpAnimation(options[1].value, () => {
            if (isCorrect) {
                setVsMessage('WIN');
                setVsColor('green');
                setScore(score + 1);
            } else {
                setVsMessage('FAIL');
                setVsColor('red');
            }

            // After one second, do the anim
            setTimeout(() => reloadOptionsAnimation(isCorrect), 1000);
        });
    };

    const handleLoss = async  () => {
        if (score > highScore) {
            await updateHighScore(score);
            await addTotalGuesses(totalGuesses);
            setHighScore(score)
        }
        setLost(true)
    }

    const handlePlayAgain = () => {
        setTotalGuesses(0);
        setScore(0);
        setLost(false);
    }

    return (
    <>
    {topPadding > 0 && <View style={{width: '100%', height: topPadding, backgroundColor: 'black'}}/>}
    <View style={styles.mainContainer}>
        {!lost ?
            <>
            <View style={styles.header}>
                <View onTouchEnd={() => {navigation.navigate('Category')}}>
                    <Text style={styles.textSecondary}>X  Ir atras</Text>
                </View>
                <View style={{flexDirection: 'row', paddingRight: 5, paddingTop: 2, gap: 15}}>
                    <Text style={styles.textSecondary}>High score: {highScore}</Text>
                    <Text style={styles.textSecondary}>Score: {score}</Text>
                </View>
            </View>

            <Animated.View style={[styles.optionContainer, { transform: [{ translateY: topOptionAnim }], opacity: optionsOpacity }]}
                onLayout={(event) => {
                    const { height } = event.nativeEvent.layout;
                    setOptionHeight(height);
                }}
            >
                <View style={{zIndex: 1, width: '100%'}}>
                    <LinearGradient colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.8)']} style={styles.imageGradient}>
                        <Text style={styles.optionText}>{`"${options[0].title}"`}</Text>
                        <Text style={styles.optionTextSecondary}>tiene</Text>
                        <Text style={styles.optionValue}>{options[0].value.toLocaleString()}</Text>
                        <Text style={styles.optionTextSecondary}>visitas promedio por mes</Text>
                    </LinearGradient>
                </View>


                <Image source={{uri: options[0].image}} resizeMode="cover" style={[styles.imageAbsolute, {borderTopEndRadius: 20, borderTopStartRadius: 20, zIndex: 0}]} placeholder={options[0].blurhash}/>
            </Animated.View>

            <View style={[styles.vsCircle, { backgroundColor: vsColor }]}>
                <Text style={styles.textSecondary}>{vsMessage}</Text>
            </View>

            <Animated.View style={[styles.optionContainer, { transform: [{ translateY: bottomOptionAnim }], opacity: optionsOpacity  }]}>
                <View style={{zIndex: 1, width: '100%'}}>
                    <LinearGradient colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.3)']} style={styles.imageGradient}>
                        
                        <Text style={[styles.optionText, {marginBottom: '25px'}]}>{`"${options[1].title}"`}</Text>
                        <Text style={styles.optionTextSecondary}>tiene</Text>
                        {showResult ? 
                        <>
                            <Text style={styles.optionValue}>{searchCount.toLocaleString()}</Text>
                            <Text style={styles.optionTextSecondary}>visitas promedio por mes</Text>
                        </>
                        : 
                        <>
                            <View onTouchStart={() => handlePressHigherLower("higher")} style={styles.button}>
                                <Text>MAS ^</Text>
                            </View>
                            <Text style={styles.optionTextSecondary}>o</Text>
                            <View onTouchStart={() => handlePressHigherLower("lower")} style={styles.button}>
                                <Text>MENOS v</Text>
                            </View>
                        </>
                        }

                    </LinearGradient>
                </View>

                <Image source={{uri: options[1].image}} resizeMode="cover" style={[styles.imageAbsolute, {zIndex: 0}]} placeholder={options[1].blurhash}/>
            </Animated.View>

            <View style={styles.timer}>
                <Text>{formatTime(time)}</Text>
            </View>
            
            </>
            :



            <>
            <View style={styles.header}>
                <View onTouchEnd={() => {navigation.navigate('Category')}}>
                    <Text style={styles.textSecondary}>X  Ir atras</Text>
                </View>
            </View>

            <View style={styles.lostScreenContainer}>
                <LinearGradient colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.8)']} style={[styles.imageGradient, {gap: 20, zIndex: 1}]}>
                        <Text style={styles.lostMainText}>Has perdido!</Text>
                        <Text style={styles.optionTextSecondary}>Score: {score}</Text>
                        <Text style={styles.optionTextSecondary}>High score: {highScore}</Text>
                        <View style={{display: 'flex', flexDirection: 'row', gap: 20}}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Category')}>
                                <Text>Volver</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handlePlayAgain}>
                                <Text>Jugar devuelta</Text>
                            </TouchableOpacity>

                        </View>
                </LinearGradient>
                <Image source={{uri: options[0].image}} resizeMode="cover" style={[styles.imageAbsolute, {zIndex: 0}]} placeholder={options[0].blurhash}/>
            </View>
            </>
        }
    </View>
    </>

    )
}

export default Game