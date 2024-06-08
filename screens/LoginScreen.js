import { Button, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default function LoginScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Button
            title='Logearse'
            onPress={() => {navigation.navigate('Home')}}
        />
      </View>
    );
  }
  