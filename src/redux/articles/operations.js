import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://harmoniq-backend-qo0h.onrender.com';

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

export const saveArticleToBookmarks = createAsyncThunk(
  'articles/saveBookmark',
  async (articleId, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const token = auth.token;

      if (!token || !articleId) {
        throw new Error('Token or article ID missing');
      }

      const response = await axios.patch(
        `/authors/saved-articles/${articleId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// GET @ /contacts
// export const fetchContacts = createAsyncThunk(
//   "contacts/fetchAll",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get("/contacts");
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// POST @ /articles
export const addArticle = createAsyncThunk(
  'articles/addArticle',
  async (article, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      console.log('Token in thunk:', token);

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

// DELETE @ /contacts/:id
// export const deleteContact = createAsyncThunk(
//   "contacts/deleteContact",
//   async (contactId, thunkAPI) => {
//     try {
//       const response = await axios.delete(`/contacts/${contactId}`);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

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

export const clearArticles = createAsyncThunk('articles/clear', async () => {
  return [];
});
