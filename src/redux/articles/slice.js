import { createSlice, isAnyOf } from "@reduxjs/toolkit";
// import { fetchContacts, addContact, deleteContact } from "./operations";
import { logOut } from "../auth/operations";
import toast from "react-hot-toast";
import { addArticle, updateArticle } from "./operations";

const slice = createSlice({
  name: "articles",
  initialState: {
    items: [],
    currentArticle: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchContacts.fulfilled, (state, action) => {
      //   state.items = action.payload;
      // })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex(article => article._id === updated._id);
        if (index !== -1) {
          state.items[index] = updated; 
        } 
        if (state.currentArticle?._id === updated._id) {
          state.currentArticle = updated;         
        }
      })
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
  },
});

export const articlesReducer = slice.reducer;
