// store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userDetails: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.userDetails = action.payload.userDetails;
    //   document.cookie = `authToken=${action.payload.token}; path=/;`;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userDetails = null;
      document.cookie = 'authToken=; Max-Age=0; path=/;';
    },
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
    clearUserDetails(state) {
      state.userDetails = null;
    },
  },
});

export const { login, logout, setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
