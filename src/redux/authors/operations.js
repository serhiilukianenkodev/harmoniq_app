import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://harmoniq-backend-qo0h.onrender.com';

export const fetchAuthors = createAsyncThunk(
  'authors/fetchAuthors',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get('/users', {
        params: { page, limit },
      });
      console.log('API Response:', response.data); 
      const authors = Array.isArray(response.data)
        ? response.data.map(author => ({
            ...author,
            _id: author._id?.$oid || author._id 
          }))
        : response.data.users || [];
      const total = response.data.total || authors.length || 0;
      return { authors, total };
    } catch (error) {
      console.error('API Error:', error.message); 
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);