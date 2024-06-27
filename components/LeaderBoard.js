import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LeaderBoard = ({ apiEndpoint, title, recordType }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {

        const fetchOptions = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
        };

        const response = await fetch(apiEndpoint, fetchOptions);
        const result = await response.json();
        if (result.success) {
          setUsers(result.message);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLeaderboard();
  }, [apiEndpoint]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView style={styles.scrollView}>
        {users.map((user, index) => (
          <TouchableOpacity
            key={index}
            style={styles.leaderBoardItem}
            onPress={() => navigation.navigate('ProfileScreen', { userId: user.id })}
          >
            <Text style={styles.rank}>TOP{index + 1}</Text>
            <Text style={styles.userName}>{user.userName}</Text>
            <Text style={styles.record}>{user.stat[recordType]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  leaderBoardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rank: {
    flex: 1,
    textAlign: 'left',
  },
  userName: {
    flex: 2,
    textAlign: 'center',
  },
  record: {
    flex: 1,
    textAlign: 'right',
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
});

export default LeaderBoard;