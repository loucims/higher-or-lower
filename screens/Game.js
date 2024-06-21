import { StyleSheet, Text, View, Platform, StatusBar, ImageBackground, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient'
import { useState, useRef, useEffect } from 'react';
import { Image } from 'expo-image';

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
    
    }
});

// const optionsData = [
//     { id: 1, title: 'Joker', image: 'https://dl.dropboxusercontent.com/scl/fi/3fnxgyyb9er2a32welmgy/joker.png?rlkey=jbnpreb0jgg8nf4xfjv9ho9pe&st=whn9a3az&dl=0', value: 160432, blurhash: 'LMC$=es+00t8~oobDjogX5oen*WB'},
//     { id: 2, title: '2012, el Apocalipsis', image: "https://dl.dropboxusercontent.com/scl/fi/960f9td46l40yleaoydc5/2012.png?rlkey=61zr78arzv7j7ycp4y5ucxd7w&st=nf7yhtv2&dl=0", value: 120000, blurhash: 'LDEyrd-pM{-:_4%MsRxt8^?a%1RP'},
//     { id: 3, title: "Furiosa, a Mad Max Story", image: 'https://dl.dropboxusercontent.com/scl/fi/laormsflj60vylmv2v0oz/furiosa.png?rlkey=qipq9ivzp436uia2s4d8g92cz&st=ufvf176w&dl=0', value: 1330302, blurhash: 'LYHnA@S#%Kozy=ofTIt67gWqNdbb'},
//     { id: 4, title: "Starwars", image: 'https://dl.dropboxusercontent.com/scl/fi/npwizc872dixrax7ad6k4/starwars.png?rlkey=v6zaycllvyi6lrtegp09f6tdj&st=7te7a8gt&dl=0', value: 22323, blurhash: 'LC9tiuIr4o=rKnWArpxY9u$y,kIv'},
//     { id: 5, title: "Garfield", image: 'https://dl.dropboxusercontent.com/scl/fi/bsmkprtinmo741ak22gzj/garfield.png?rlkey=ib171dje8gzjhyxcza4acrjfh&st=81ir73sb&dl=0', value: 34334, blurhash: 'LAR]Jsvj_jj^-.knZ+RS@8OXNZ$M'},
// ];


const Game = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const topPadding = Platform.OS === 'android' ? StatusBar.currentHeight : insets.top;
    const [optionHeight, setOptionHeight] = useState(0);

    const [loading, setLoading] = useState(false)
    const { genre, limit, startAfterKey, initData } = route.params;

    const [lastKey, setLastKey] = useState(startAfterKey);
    const [optionFeed, setOptionFeed] = useState(initData || []);
    const [options, setOptions] = useState([optionFeed[0], optionFeed[1]]);

    const [highScore, setHighScore] = useState(0);
    const [score, setScore] = useState(0);


    const [searchCount, setSearchCount] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const [vsMessage, setVsMessage] = useState('VS');
    const [vsColor, setVsColor] = useState('black');
    const topOptionAnim = useRef(new Animated.Value(0)).current;
    const bottomOptionAnim = useRef(new Animated.Value(0)).current;
    const optionsOpacity = useRef(new Animated.Value(1)).current;

    const fetchQuestions = async (genre = 'movie', pageSize = 10, paginationLastKey = '') => {
        setLoading(true);
        try {
            const fetchOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
    
            const params = new URLSearchParams({
                pageSize: pageSize,
                lastKey: paginationLastKey
            });
    
            console.log(`http://10.0.2.2:8080/options/genre/${genre}/paginated?${params}`);
            const response = await fetch(`http://10.0.2.2:8080/options/genre/${genre}/paginated?${params}`, fetchOptions);
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

    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
        }
    }, [score])


    const countUpAnimation = (targetValue, callback) => {
        let count = 0;
        const interval = setInterval(() => {
            if (count < targetValue) {
                count += Math.ceil(targetValue / 10);
                setSearchCount(count);
            } else {
                clearInterval(interval);
                setSearchCount(targetValue); // Ensure it ends at the target value
                if (callback) {
                    callback();
                }
            }
        }, 1);
    };

    const handlePress = (guess) => {
        let isCorrect
        if (guess === 'higher') {
            isCorrect = options[0].value <= options[1].value;
        } else if (guess === 'lower') {
            isCorrect = options[0].value >= options[1].value;
        }
        
        setShowResult(true)

        const reloadOptionsAnimation = () => {
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

                    // const nextOptions = [
                    //     options[1],
                    //     optionsData[(optionsData.indexOf(options[1]) + 1) % optionsData.length]
                    // ];
                    // setOptions(nextOptions);

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
                setScore(0);
            }

            // After one second, do the anim
            setTimeout(reloadOptionsAnimation, 1000);
        });
    };

    return (
    <>
    {topPadding > 0 && <View style={{width: '100%', height: topPadding, backgroundColor: 'black'}}/>}
    <View style={styles.mainContainer}>
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
                        <View onTouchStart={() => handlePress("higher")} style={styles.button}>
                            <Text>MAS ^</Text>
                        </View>
                        <Text style={styles.optionTextSecondary}>o</Text>
                        <View onTouchStart={() => handlePress("lower")} style={styles.button}>
                            <Text>MENOS v</Text>
                        </View>
                    </>
                    }

                </LinearGradient>
            </View>

            <Image source={{uri: options[1].image}} resizeMode="cover" style={[styles.imageAbsolute, {zIndex: 0}]} placeholder={options[1].blurhash}/>
        </Animated.View>
        
    </View>
    </>

    )
}

export default Game