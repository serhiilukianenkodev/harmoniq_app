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
    totalPages: 0,
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      // .addCase(fetchContacts.fulfilled, (state, action) => {
      //   state.items = action.payload;
      // })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.items.push(action.payload);
        toast.success('Article is added successfully!');
      })
      // .addCase(deleteContact.fulfilled, (state, action) => {
      //   const index = state.items.findIndex(
      //     (contact) => contact.id === action.payload.id
      //   );
      //   state.items.splice(index, 1);
      //   toast.success("Contact is delete successfully!");
      // })
      // .addCase(logOut.fulfilled, (state) => {
      //   state.items = [];
      // })
      // .addMatcher(
      //   isAnyOf(
      //     fetchContacts.pending,
      //     addContact.pending,
      //     deleteContact.pending
      //   ),
      //   (state) => {
      //     state.loading = true;
      //   }
      // )
      // .addMatcher(
      //   isAnyOf(
      //     fetchContacts.rejected,
      //     addContact.rejected,
      //     deleteContact.rejected
      //   ),
      //   (state, action) => {
      //     state.loading = false;
      //     state.error = action.payload;
      //     toast.error(
      //       "Something went wrong. Please try again. Error: " + action.payload
      //     );
      //   }
      // )
      // .addMatcher(
      //   isAnyOf(
      //     fetchContacts.fulfilled,
      //     addContact.fulfilled,
      //     deleteContact.fulfilled,
      //     logOut.fulfilled
      //   ),
      //   (state) => {
      //     state.loading = false;
      //     state.error = null;
      //   }
      // );
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
      .addCase(fetchSavedArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload.articles;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(logOut.fulfilled, state => {
        state.items = [];
      });
  },
});

export const articlesReducer = slice.reducer;
