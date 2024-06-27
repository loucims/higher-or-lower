import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, StatusBar, Platform } from 'react-native';
import Leaderboard from '../components/Leaderboard';
import {API_URL} from "@env"
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LeaderboardScreen = () => {

  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === 'android' ? StatusBar.currentHeight : insets.top;
  const [currentLeaderboard, setCurrentLeaderboard] = useState('normal');

  return (
    <>
    {topPadding > 0 && <View style={{width: '100%', height: topPadding, backgroundColor: 'transparent'}}/>}
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.toggleButton, currentLeaderboard === 'normal' && styles.activeToggleButton]} 
          onPress={() => setCurrentLeaderboard('normal')}
        >
          <Text style={[styles.toggleButtonText, currentLeaderboard === 'normal' && styles.activeToggleButtonText]}>Leaderboard Normal</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.toggleButton, currentLeaderboard === 'timer' && styles.activeToggleButton]} 
          onPress={() => setCurrentLeaderboard('timer')}
        >
          <Text style={[styles.toggleButtonText, currentLeaderboard === 'timer' && styles.activeToggleButtonText]}>Leaderboard Timer</Text>
        </TouchableOpacity>
      </View>
      {currentLeaderboard === 'normal' ? 
        <Leaderboard
          key="normal"
          apiEndpoint={`${API_URL}/user/leaderboard`}
          title="Ranking Modo Normal"
          recordType="recordNormal"
        />
      : 
        <Leaderboard
          key='timer'
          apiEndpoint={`${API_URL}/user/leaderboardTimer`}
          title="Ranking Modo Timer"
          recordType="recordTimer"
          rankingType='timer'
        />
      }
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  toggleButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  activeToggleButton: {
    backgroundColor: 'tomato',
  },
  toggleButtonText: {
    fontSize: 16,
    color: '#000',
  },
  activeToggleButtonText: {
    color: '#fff',
  },
});

export default LeaderboardScreen;