import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/selectors";

export const selectAuthors = (state) => state.authors.items;

// export const selectFilteredContacts = createSelector(
//   [selectContacts, selectNameFilter],
//   (contacts, filter) =>
//     contacts.filter((contact) => {
//       return (
//         contact.name
//           .toLocaleLowerCase()
//           .includes(filter.trim().toLocaleLowerCase()) ||
//         contact.number.includes(filter.trim())
//       );
//     })
// );
