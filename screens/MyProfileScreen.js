import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserProfile from '../components/UserProfile';
import {API_URL} from "@env"

const MyProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {

        const fetchOptions = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
        };

        const response = await fetch(`${API_URL}/profile`, fetchOptions); 
        const result = await response.json();
        if (result.success) {
          setUserData(result.message);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <View style={styles.container}>
      {userData ? (
        <UserProfile
          userName={userData.userName}
          recordNormal={userData.stat.recordNormal}
          recordTimer={userData.stat.recordTimer}
          totalGuesses={userData.stat.totalGuesses}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Cargando...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyProfileScreen;