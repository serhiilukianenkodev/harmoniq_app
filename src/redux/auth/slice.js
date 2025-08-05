import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';
import { uploadUserPhoto } from '../authors/operations.js';
import {
  addToSavedArticles,
  deleteFromSavedArticles,
} from '../articles/operations.js';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isFetching: false,
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(uploadUserPhoto.fulfilled, (state, action) => {
        state.user = action.payload.data;
      })
      .addCase(addToSavedArticles.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(addToSavedArticles.fulfilled, (state, action) => {
        state.user.savedArticles = action.payload.data;
        state.isFetching = false;
      })
      .addCase(deleteFromSavedArticles.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(deleteFromSavedArticles.fulfilled, (state, action) => {
        state.user.savedArticles = state.user.savedArticles.filter(
          article => article !== action.payload
        );
        state.isFetching = false;
      })
      .addCase(addToSavedArticles.rejected, (state, action) => {
        state.isFetching = false;
      });
  },
});

export const authReducer = authSlice.reducer;
