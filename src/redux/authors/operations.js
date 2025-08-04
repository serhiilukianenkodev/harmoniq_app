import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://harmoniq-backend-qo0h.onrender.com';
axios.defaults.withCredentials = true;

export const fetchTopCreators = async () => {
  try {
    const response = await axios.get(
      `${window.location.origin}/harmoniq.users.json`
    );
    const data = response.data;

    const sorted = data
      .toSorted((a, b) => b.articlesAmount - a.articlesAmount)
      .slice(0, 6);
    return sorted;
  } catch (error) {
    console.error('Помилка при завантаженні авторів:', error);
    return [];
  }
};

export const fetchAuthors = createAsyncThunk(
  'authors/fetchAuthors',
  async ({ page, perPage }, { rejectWithValue }) => {
    try {
      const response = await axios.get('/authors', {
        params: { page, perPage },
      });
      const authors = response.data.data?.users || [];
      const total = response.data.data?.totalItems || authors.length;
      return { authors, total };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// POST /user/photo
export const uploadUserPhoto = createAsyncThunk(
  'user/uploadPhoto',
  async (formData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      const response = await axios.post('/user/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
