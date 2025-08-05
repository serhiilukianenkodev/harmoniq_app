import {
  fetchArticleById,
  fetchRecommendedArticles,
  getAuthorsArticles,
  getUsersSavedArticles,
  // saveArticleToBookmarks,
} from './operations';

import { createSlice, isAnyOf } from '@reduxjs/toolkit';
// import { fetchContacts, addContact, deleteContact } from "./operations";
import { logOut } from '../auth/operations';
import toast from 'react-hot-toast';
import {
  addArticle,
  fetchArticlesByAuthor,
  fetchSavedArticles,
} from './operations';

const slice = createSlice({
  name: 'articles',
  initialState: {
    items: [],
    currentArticle: null,
    recommendations: [],
    totalPages: 0,
    loading: false,
    error: null,
    bookmarkedIds: [],
    authorsArticles: [],
    usersSavedArticles: [],
    isArticleEditable: false,
  },
  reducers: {
    changeIsArticleEditable(state, action) {
      state.isArticleEditable = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addArticle.fulfilled, (state, action) => {
        state.items.push(action.payload);
        toast.success('Article is added successfully!');
      })
      .addCase(fetchArticleById.pending, state => {
        state.loading = true;
        state.current = null;
      })
      .addCase(fetchArticleById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentArticle = payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRecommendedArticles.fulfilled, (state, action) => {
        state.recommendations = action.payload;
      })
      .addCase(fetchArticlesByAuthor.pending, state => {
        state.loading = true;
      })
      .addCase(fetchArticlesByAuthor.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload.articles;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchArticlesByAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(fetchSavedArticles.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.error = null;
      //   state.items = action.payload.articles;
      //   state.totalPages = action.payload.totalPages;
      // })
      .addCase(logOut.fulfilled, state => {
        state.items = [];
      })
      .addCase(getUsersSavedArticles.fulfilled, (state, action) => {
        state.usersSavedArticles = action.payload.data;
      })
      .addCase(getAuthorsArticles.fulfilled, (state, action) => {
        state.authorsArticles = action.payload.articles;
      });
  },
});

export const articlesReducer = slice.reducer;
export const { changeIsArticleEditable } = slice.actions;
