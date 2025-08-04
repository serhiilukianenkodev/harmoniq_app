import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://harmoniq-backend-qo0h.onrender.com';

export const fetchTopCreators = createAsyncThunk(
  'authors/fetchTopCreators',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/authors`, {
        params: {
          page: 1,
          perPage: 100,
        },
      });
      const creators = response.data?.data?.users || [];
      const topCreators = creators
        .toSorted((a, b) => b.articlesAmount - a.articlesAmount)
        .slice(0, 6);
      return topCreators;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

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

export const fetchAuthorById = createAsyncThunk(
  'authors/fetchById',
  async (authorId, thunkAPI) => {
    try {
      const response = await axios.get(`/authors/${authorId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);