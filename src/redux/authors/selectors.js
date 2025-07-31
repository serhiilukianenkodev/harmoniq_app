export const selectAuthors = (state) => state.authors.items;
export const selectIsLoading = (state) => state.authors.isLoading;
export const selectHasMore = (state) => state.authors.hasMore;
export const selectError = (state) => state.authors.error;