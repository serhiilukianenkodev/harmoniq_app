import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://harmoniq-backend-qo0h.onrender.com';

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