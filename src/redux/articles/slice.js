import { createSlice, isAnyOf } from "@reduxjs/toolkit";
// import { fetchContacts, addContact, deleteContact } from "./operations";
import { logOut } from "../auth/operations";
import toast from "react-hot-toast";

const slice = createSlice({
  name: "articles",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchContacts.fulfilled, (state, action) => {
  //       state.items = action.payload;
  //     })
  //     .addCase(addContact.fulfilled, (state, action) => {
  //       state.items.push(action.payload);
  //       toast.success("Contact is added successfully!");
  //     })
  //     .addCase(deleteContact.fulfilled, (state, action) => {
  //       const index = state.items.findIndex(
  //         (contact) => contact.id === action.payload.id
  //       );
  //       state.items.splice(index, 1);
  //       toast.success("Contact is delete successfully!");
  //     })
  //     .addCase(logOut.fulfilled, (state) => {
  //       state.items = [];
  //     })
  //     .addMatcher(
  //       isAnyOf(
  //         fetchContacts.pending,
  //         addContact.pending,
  //         deleteContact.pending
  //       ),
  //       (state) => {
  //         state.loading = true;
  //       }
  //     )
  //     .addMatcher(
  //       isAnyOf(
  //         fetchContacts.rejected,
  //         addContact.rejected,
  //         deleteContact.rejected
  //       ),
  //       (state, action) => {
  //         state.loading = false;
  //         state.error = action.payload;
  //         toast.error(
  //           "Something went wrong. Please try again. Error: " + action.payload
  //         );
  //       }
  //     )
  //     .addMatcher(
  //       isAnyOf(
  //         fetchContacts.fulfilled,
  //         addContact.fulfilled,
  //         deleteContact.fulfilled,
  //         logOut.fulfilled
  //       ),
  //       (state) => {
  //         state.loading = false;
  //         state.error = null;
  //       }
  //     );
  // },
});

export const articlesReducer = slice.reducer;
