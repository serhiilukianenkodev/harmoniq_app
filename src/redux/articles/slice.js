import {
  fetchArticleById,
  fetchRecommendedArticles,
  getAuthorsArticles,
  getUsersSavedArticles,
  // saveArticleToBookmarks,
  clearArticles,
} from './operations';

import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { logOut } from '../auth/operations';
import {
  addArticle,
  fetchArticlesByAuthor,
  fetchSavedArticles,
  updateArticle,
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
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex(
          article => article._id === updated._id
        );
        if (index !== -1) {
          state.items[index] = updated;
        }
        if (state.currentArticle?._id === updated._id) {
          state.currentArticle = updated;
        }
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
      // .addCase(fetchArticlesByAuthor.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.error = null;
      //   state.items = action.payload.articles;
      //   state.totalPages = action.payload.totalPages;
      // })
      .addCase(fetchArticlesByAuthor.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { articles, totalPages } = action.payload;
        if (action.meta.arg.page === 1) {
          state.authorsArticles = articles;
        } else {
          state.authorsArticles.push(...articles);
        }
        state.totalPages = totalPages;
      })
      .addCase(fetchArticlesByAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(fetchSavedArticles.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.items.push(...action.payload.articles);
      //   state.page = action.payload.page;
      //   state.totalPages = action.payload.totalPages;
      // })
      .addCase(fetchSavedArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { articles, totalPages } = action.payload;
        if (action.meta.arg.page === 1) {
          state.usersSavedArticles = articles;
        } else {
          state.usersSavedArticles.push(...articles);
        }
        state.totalPages = totalPages;
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
      // .addCase(getUsersSavedArticles.fulfilled, (state, action) => {
      //   state.usersSavedArticles = action.payload.articles;
      // })
      // .addCase(getAuthorsArticles.fulfilled, (state, action) => {
      //   state.authorsArticles = action.payload.articles;
      // });
      .addCase(getUsersSavedArticles.fulfilled, (state, action) => {
        state.usersSavedArticles = action.payload.articles;
      })
      .addCase(getAuthorsArticles.fulfilled, (state, action) => {
        state.authorsArticles = action.payload.articles;
      })
      // .addCase(clearArticles.fulfilled, state => {
      //   state.authorsArticles = [];
      //   state.usersSavedArticles = [];
      //   state.totalPages = 0;
      // });
      .addCase(clearArticles.fulfilled, state => {
        state.authorsArticles = [];
        state.usersSavedArticles = [];
        state.totalPages = 0;
      });
  },
});

export const articlesReducer = slice.reducer;
export const { changeIsArticleEditable } = slice.actions;
