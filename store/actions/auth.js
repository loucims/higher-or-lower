import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import {API_URL} from '@env'

export const signup = createAsyncThunk('auth/signup', async ({ email, password }, thunkAPI) => {
    try {
        const response = await fetch(`${API_URL}/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': "token=ey28232w7u32u7hdsuhsdhuh2h7272273"
            },
            body: JSON.stringify({ email, password }),
            
        });

        if (!response.ok) {
            const errorResData = await response.json();
            let message = 'Something went wrong!';
            if (errorResData.message.includes('El email no puede ya existir')) {
                message = 'This email already exists!';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        await AsyncStorage.setItem(
            'userData',
            JSON.stringify({
                token: resData.token,
                userId: resData.userId
            })
        );

        return resData;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
    try {
        const response = await fetch(`${API_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': "token=ey28232w7u32u7hdsuhsdhuh2h7272273"
            },
            body: JSON.stringify(
              {
                "mail": email,
                "password": password
              }
            ),
            
        });

        if (!response.ok) {
            const errorResData = await response.json();
            let message = 'Something went wrong!';
            if (errorResData.message.includes('Datos incorrectos')) {
                message = 'Invalid email or password!';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        await AsyncStorage.setItem(
            'userData',
            JSON.stringify({
                token: resData.token,
                userId: resData.userId
            })
        );

        return resData;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});



//import { AsyncStorage } from 'react-native';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
//export const AUTHENTICATE = 'AUTHENTICATE';
//export const LOGOUT = 'LOGOUT';
//export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

//let timer;

/*export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://keen-man-hot.ngrok-free.app',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );
    console.log("Como vengo?", response);

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'API_URL',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};*/