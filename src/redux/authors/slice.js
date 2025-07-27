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
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAuthors.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchAuthors.fulfilled, (state, action) => {
          state.isLoading = false;
          const newAuthors = Array.isArray(action.payload.authors) ? action.payload.authors : [];
          state.items = [...state.items, ...newAuthors];
          state.hasMore = state.items.length + newAuthors.length < action.payload.total;
        })
        .addCase(fetchAuthors.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        });
    },
  });

  export default authorsSlice.reducer;