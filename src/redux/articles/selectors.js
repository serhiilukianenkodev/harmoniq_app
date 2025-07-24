import { createSelector } from "@reduxjs/toolkit";
// import { selectNameFilter } from "../filters/selectors";

export const selectArticles = (state) => state.articles.items;

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
