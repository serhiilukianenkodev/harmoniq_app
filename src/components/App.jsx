import { useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';
import { refreshUser } from '../redux/auth/operations';
import { selectIsRefreshing } from '../redux/auth/selectors';
import { Toaster } from 'react-hot-toast';
import Loader from './Loader/Loader';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const ArticlesPage = lazy(() => import('../pages/ArticlesPage/ArticlesPage '));
const ArticlePage = lazy(() => import('../pages/ArticlePage/ArticlePage'));
const UploadPhoto = lazy(() => import('../pages/UploadPhoto/UploadPhoto'));
const AuthorsPage = lazy(() => import('../pages/AuthorsPage/AuthorsPage'));
const AuthorProfilePage = lazy(() =>
  import('../pages/AuthorProfilePage/AuthorProfilePage')
);
const CreateArticlePage = lazy(() =>
  import('../pages/CreateArticlePage/CreateArticlePage')
);
const UserProfile = lazy(() => import('../pages/UserProfile/UserProfile'));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      {isRefreshing ? (
        <b>Refreshing user...</b>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  redirectTo="/articles"
                  component={<RegisterPage />}
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute redirectTo="/" component={<LoginPage />} />
              }
            />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:id" element={<ArticlePage />} />

            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/authors/:id" element={<AuthorProfilePage />} />
            <Route
              path="/photo"
              element={
                <PrivateRoute redirectTo="/login" component={<UploadPhoto />} />
              }
            />
            <Route
              path="/create"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<CreateArticlePage />}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute redirectTo="/login" component={<UserProfile />} />
              }
            />
          </Routes>
          <Loader />
        </Layout>
      )}
      <Toaster />
    </>
  );
};

export default App;
