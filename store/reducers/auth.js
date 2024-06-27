// store/reducers/auth.js
import { createSlice } from '@reduxjs/toolkit';
import { login, signup } from '../actions/auth';

const initialState = {
    token: null,
    userId: null,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.userId = action.payload.userId;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload.error;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.userId = action.payload.userId;
                state.error = null;
            })
            .addCase(signup.rejected, (state, action) => {
                state.error = action.payload.error;
            });
    }
});

export const { clearError } = authSlice.actions;
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