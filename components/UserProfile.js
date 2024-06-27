import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const UserProfile = ({ userName, recordNormal, recordTimer, totalGuesses, showBackButton, onBack }) => {
  return (
    <View style={styles.container}>
      {showBackButton && <Button title="Back" onPress={onBack} />}
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.userName}>{userName}</Text>
      <Text style={styles.stat}>Record Normal: {recordNormal}</Text>
      <Text style={styles.stat}>Record Timer: {recordTimer}</Text>
      <Text style={styles.stat}>Total Guesses: {totalGuesses}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  userName: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    color: '#000',
  },
  stat: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
    color: '#000',
  },
});

export default UserProfile;