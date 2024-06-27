// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/reducers/auth'; // Adjust the path as needed

const store = configureStore({
    reducer: {
        auth: authReducer
    }
});

export default store;
