export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectUser = state => state.auth.user;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectSavedArticles = state =>
  state.auth.user?.savedArticles || [];

export const selectIsFetching = state => state.auth.isFetching;
