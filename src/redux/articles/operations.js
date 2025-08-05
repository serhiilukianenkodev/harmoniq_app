import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import toast from 'react-hot-toast';

export const fetchArticleById = createAsyncThunk(
  'articles/fetchById',
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/articles/${id}`);
      return res.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const fetchRecommendedArticles = createAsyncThunk(
  'articles/fetchRecommended',
  async ({ excludeId, perPage = 6 }, thunkAPI) => {
    try {
      const res = await axios.get('/articles', {
        params: { page: 1, perPage },
      });
      const list = res.data.data?.articles || res.data.data || [];
      const filtered = list.filter(a => a._id !== excludeId);
      const shuffled = filtered.toSorted(() => Math.random() - 0.5);
      return shuffled.slice(0, 3);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// POST @ /articles
export const addArticle = createAsyncThunk(
  'articles/addArticle',
  'articles/addArticle',
  async (article, thunkAPI) => {
    try {
      // const state = thunkAPI.getState();
      // const token = state.auth.token;

      // console.log("Token in thunk:", token);

      const response = await axios.post('/articles', article, {
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

export const fetchArticlesByAuthor = createAsyncThunk(
  'articles/fetchByAuthor',
  async ({ authorId, page = 1 }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/authors/${authorId}/articles?page=${page}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchSavedArticles = createAsyncThunk(
  'articles/fetchSaved',
  async ({ page = 1 }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      const response = await axios.get(`/saved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page },
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addToSavedArticles = createAsyncThunk(
  'articles/addToSaved',
  async (articleId, thunkAPI) => {
    try {
      const response = await axios.post(`/authors/saved-articles/${articleId}`);
      toast.success('Article added to saved!');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteFromSavedArticles = createAsyncThunk(
  'articles/addToSaved',
  async (articleId, thunkAPI) => {
    try {
      await axios.delete(`/authors/saved-articles/${articleId}`);
      toast.success('Article removed from saved!');
      return articleId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getAuthorsArticles = createAsyncThunk(
  'articles/authorsArticles',
  async ({ authorId, page }, thunkAPI) => {
    try {
      const data = await axios.get(`/authors/${authorId}/articles`);
      return data.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getUsersSavedArticles = createAsyncThunk(
  'articles/usersSavedArticles',
  async ({ authorId, page }, thunkAPI) => {
    try {
      const data = await axios.get(`/authors/saved-articles`);
      console.log('🚀 ~ data:', data);
      return data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const clearArticles = createAsyncThunk('articles/clear', async () => {
  return [];
});
