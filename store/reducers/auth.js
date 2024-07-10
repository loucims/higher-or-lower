// store/reducers/auth.js
import { createSlice } from '@reduxjs/toolkit';
import { authenticate, login, signup } from '../actions/auth';

const initialState = {
    token: null,
    userId: null,
    error: null,
    isLoggedIn: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
        logIn(state) {
          state.isLoggedIn = true;
        },
        logOff(state) { 
          state.isLoggedIn = false;
          state.token = null;
          state.userId = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                console.log(action.payload.message)
                state.token = action.payload.message;
                state.userId = null;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload.error;
            })
            .addCase(authenticate, (state, action) => {
              state.token = action.payload;
          })
            .addCase(signup.fulfilled, (state, action) => {
                state.token = action.payload.message;
                state.userId = action.payload.userId;
                state.error = null;
                console.log("token: ", action.payload);
            })            
            .addCase(signup.rejected, (state, action) => {
                state.error = action.payload.error;
            });
    }
});

export const { clearError, logIn, logOff } = authSlice.actions;
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