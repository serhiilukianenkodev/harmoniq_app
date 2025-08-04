export const selectAuthors = state => state.authors.items;
export const selectTopCreators = state => state.authors.topCreators;
export const selectIsLoading = state => state.authors.isLoading;
export const selectHasMore = state => state.authors.hasMore;
export const selectError = state => state.authors.error;

export const selectAuthor = state => state.authors.author;
