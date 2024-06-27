import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import UserProfile from '../components/UserProfile';
import {API_URL} from "@env"

const ProfileScreen = ({ route, navigation }) => {
  const { userId } = route.params;
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

        const response = await fetch(`${API_URL}/getUserById/${userId}`, fetchOptions);
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
  }, [userId]);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {userData ? (
        <UserProfile
          userName={userData.userName}
          recordNormal={userData.stat.recordNormal}
          recordTimer={userData.stat.recordTimer}
          totalGuesses={userData.stat.totalGuesses}
          showBackButton={true}
          onBack={handleBack}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;