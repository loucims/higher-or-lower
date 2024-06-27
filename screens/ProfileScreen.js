import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import UserProfile from '../components/UserProfile';
import {API_URL} from "@env"
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../store/selectors/auth';
import { ActivityIndicator } from 'react-native';

const ProfileScreen = ({ route, navigation }) => {
  const token = useSelector(selectAuthToken)
  const { userId } = route.params;
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
          const fetchOptions = {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `${token}`,
              },
          };
  
          const response = await fetch(`${API_URL}/user/profile/${userId}`, fetchOptions);
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();

          setUserData(result.message)
      } catch (error) {
          console.log(error);
      }
    }
    if (!token) return;

    fetchProfile();
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
          <ActivityIndicator size="large" color="black" style={styles.spinner}/>
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