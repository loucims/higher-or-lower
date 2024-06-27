import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Make sure you have expo-linear-gradient installed

const UserProfile = ({ userName, recordNormal, recordTimer, totalGuesses, showBackButton, onBack }) => {
  return (
    <LinearGradient
      colors={['#ff7e5f', '#feb47b']}
      style={styles.container}
    >
      {showBackButton && (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Ir atras</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.userName}>{userName}</Text>
      <View style={styles.statsContainer}>
        <Text style={styles.stat}>Record Normal: <Text style={styles.statValue}>{recordNormal}</Text></Text>
        <Text style={styles.stat}>Record Timer: <Text style={styles.statValue}>{recordTimer}</Text></Text>
        <Text style={styles.stat}>Total Guesses: <Text style={styles.statValue}>{totalGuesses}</Text></Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  userName: {
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 10,
    color: '#fff',
  },
  statsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  stat: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 5,
    color: '#fff',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default UserProfile;