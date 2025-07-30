import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://harmoniq-backend-qo0h.onrender.com';

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