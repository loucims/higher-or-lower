import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../store/selectors/auth';
import { ActivityIndicator } from 'react-native';

const Leaderboard = ({ apiEndpoint, title, rankingType = 'normal' }) => {
  const token = useSelector(selectAuthToken);

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true)
      try {
        const fetchOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        };

        const endpoint = apiEndpoint;
        const response = await fetch(endpoint, fetchOptions);
        const result = await response.json();
        if (result.success) {
          console.log(result.message)
          setUsers(result.message);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false)
    };

    fetchLeaderboard();
  }, [apiEndpoint, rankingType]);

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
      {loading ?
      <ActivityIndicator size="large" color="black" style={styles.spinner}/>
      :
      <ScrollView style={styles.scrollView}>
        {users.map((user, index) => (
          <TouchableOpacity
            key={index}
            style={styles.leaderboardItem}
            onPress={() => navigation.navigate('ProfileScreen', { userId: user.id })}
          >
            <Text style={styles.rank}>TOP{index + 1}</Text>
            <Text style={styles.userName}>{user.userName}</Text>
            <Text style={styles.record}>{rankingType == 'normal' ? user.stat.recordNormal : user.stat.recordTimer}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  activeToggleButton: {
    backgroundColor: '#007AFF',
  },
  toggleButtonText: {
    fontSize: 16,
    color: '#000',
  },
  activeToggleButtonText: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 16,
  },
  record: {
    fontSize: 16,
    color: '#007AFF',
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default Leaderboard;