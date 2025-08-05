import { createSelector } from '@reduxjs/toolkit';
// import { selectNameFilter } from "../filters/selectors";

export const selectArticles = state => state.articles.items;
export const selectLoading = state => state.articles.loading;

export const selectCurrentArticle = state => state.articles.currentArticle;
export const selectRecommendedArticles = state =>
  state.articles.recommendations;
export const selectArticlesLoading = state => state.articles.loading;
export const selectArticlesError = state => state.articles.error;

export const selectBookmarkedIds = state => state.articles.bookmarkedIds;
export const selectAuthorsArticles = state => state.articles.authorsArticles;
export const selectUsersSavedArticles = state =>
  state.articles.usersSavedArticles;
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

export const selectTotalPages = state => state.articles.totalPages;
