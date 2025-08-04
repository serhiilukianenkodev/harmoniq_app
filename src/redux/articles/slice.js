import { createSlice } from '@reduxjs/toolkit';
import {
  addArticle,
  fetchArticleById,
  fetchRecommendedArticles,
  saveArticleToBookmarks,
} from './operations';
import toast from 'react-hot-toast';

const slice = createSlice({
  name: 'articles',
  initialState: {
    items: [],
    currentArticle: null,
    recommendations: [],
    loading: false,
    error: null,
    bookmarkedIds: [],
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
      .addCase(saveArticleToBookmarks.fulfilled, (state, action) => {
        state.bookmarkedIds.push(action.payload.articleId);
        toast.success('Article saved to bookmarks!');
      })
      .addCase(saveArticleToBookmarks.rejected, (state, action) => {
        toast.error('Failed to save bookmark: ' + action.payload);
      });
  },
});

export const articlesReducer = slice.reducer;
