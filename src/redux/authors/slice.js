import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthors } from './operations';

const authorsSlice = createSlice({
  name: 'authors',
  initialState: {
    items: [],
    isLoading: false,
    hasMore: true,
    error: null,
  },
  reducers: {
    resetAuthors: (state) => {
      state.items = [];
      state.isLoading = false;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.isLoading = false;
        const newAuthors = Array.isArray(action.payload.authors) ? action.payload.authors : [];
        const uniqueNewAuthors = newAuthors.filter(
          (newAuthor) => !state.items.some((existingAuthor) => existingAuthor._id === newAuthor._id)
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
  },
});

export const { resetAuthors } = authorsSlice.actions;
export default authorsSlice.reducer;
export { fetchAuthors } from './operations';