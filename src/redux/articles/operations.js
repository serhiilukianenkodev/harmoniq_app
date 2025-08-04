import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

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
