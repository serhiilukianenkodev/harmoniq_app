import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthorById, fetchAuthors, fetchTopCreators } from './operations';

const authorsSlice = createSlice({
  name: 'authors',
  initialState: {
    items: [],
    topCreators: [],
    isLoading: false,
    hasMore: true,
    error: null,
    author: null,
  },
  reducers: {
    resetAuthors: state => {
      state.items = [];
      state.isLoading = false;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAuthors.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.isLoading = false;
        const newAuthors = Array.isArray(action.payload.authors)
          ? action.payload.authors
          : [];
        const uniqueNewAuthors = newAuthors.filter(
          newAuthor =>
            !state.items.some(
              existingAuthor => existingAuthor._id === newAuthor._id
            )
        );
        if (action.meta.arg.page === 1) {
          state.items = uniqueNewAuthors;
        } else {
          state.items = [...state.items, ...uniqueNewAuthors];
        }
        state.hasMore = action.payload.total > state.items.length;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchTopCreators.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTopCreators.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topCreators = action.payload;
      })
      .addCase(fetchTopCreators.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchAuthorById.fulfilled, (state, action) => {
        state.author = action.payload;
      });
  },
});

export const { resetAuthors } = authorsSlice.actions;
export default authorsSlice.reducer;
export { fetchAuthors, fetchTopCreators } from './operations';
