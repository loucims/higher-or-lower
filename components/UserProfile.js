import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const UserProfile = ({ userName, recordNormal, recordTimer, totalGuesses, showBackButton, onBack }) => {
  return (
    <View style={styles.container}>
      {showBackButton && <Button title="Back" onPress={onBack} />}
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.userName}>{userName}</Text>
      <Text>Record Normal: {recordNormal}</Text>
      <Text>Record Timer: {recordTimer}</Text>
      <Text>Total Guesses: {totalGuesses}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userName: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default UserProfile;