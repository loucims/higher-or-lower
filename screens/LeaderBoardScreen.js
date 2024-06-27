import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Leaderboard from '../components/Leaderboard';
import {API_URL} from "@env"

const LeaderboardScreen = () => {
  const [currentLeaderboard, setCurrentLeaderboard] = useState('normal');

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Leaderboard Normal"
          onPress={() => setCurrentLeaderboard('normal')}
          disabled={currentLeaderboard === 'normal'}
        />
        <Button
          title="Leaderboard Timer"
          onPress={() => setCurrentLeaderboard('timer')}
          disabled={currentLeaderboard === 'timer'}
        />
      </View>
      {currentLeaderboard === 'normal' ? (
        <Leaderboard
          apiEndpoint={`${API_URL}/getLeaderboardUsers`}
          title="Ranking Modo Normal"
          recordType="recordNormal"
        />
      ) : (
        <Leaderboard
          apiEndpoint={`${API_URL}/getLeaderboardUsersTimer`}
          title="Ranking Modo Timer"
          recordType="recordTimer"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default LeaderboardScreen;