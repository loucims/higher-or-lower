import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from '../actions/auth';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        },
        signup(state, action) {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        }
    }
});

export const { login, signup } = authSlice.actions;
export default authSlice.reducer;

/*export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true
      };
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId
    //   };
    default:
      return state;
  }
};*/