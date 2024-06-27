import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import LeaderBoard from '../components/leaderBoard';
import {API_URL} from "@env"

const LeaderBoardScreen = () => {
  const [currentLeaderBoard, setCurrentLeaderBoard] = useState('normal');

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="LeaderBoard Normal"
          onPress={() => setCurrentLeaderBoard('normal')}
          disabled={currentLeaderBoard === 'normal'}
        />
        <Button
          title="LeaderBoard Timer"
          onPress={() => setCurrentLeaderBoard('timer')}
          disabled={currentLeaderBoard === 'timer'}
        />
      </View>
      {currentLeaderBoard === 'normal' ? (
        <LeaderBoard
          apiEndpoint={`${API_URL}/getLeaderBoardUsers`}
          title="Ranking Modo Normal"
          recordType="recordNormal"
        />
      ) : (
        <LeaderBoard
          apiEndpoint={`${API_URL}/getLeaderBoardUsersTimer`}
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

export default LeaderBoardScreen;