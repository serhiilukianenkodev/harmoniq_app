import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://harmoniq-backend-qo0h.onrender.com';

export const fetchAuthors = createAsyncThunk(
  'authors/fetchAuthors',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      console.log('Fetching authors with params:', { page, limit });
      const response = await axios.get('/authors', {
        params: { page, limit },
      });
      console.log('API Response:', response.data);

      const authors = response.data.data?.users || [];
      const total = response.data.data?.totalItems || authors.length;

      const uniqueIds = new Set(authors.map((author) => author._id));
      if (uniqueIds.size < authors.length) {
        console.warn('Duplicate _id found in API response:', authors);
      }

      if (!authors.length) {
        console.warn('No authors returned from API');
      }

      return { authors, total };
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);