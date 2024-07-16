/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import App from '@/App';

const HomePage = lazy(() => import('@/Pages/Home'));
const SignInPage = lazy(() => import('@/Pages/sign-in'));
const SignUpPage = lazy(() => import('@/Pages/sign-up'));
const AuthCallbackPage = lazy(() => import('@/Pages/AuthCallbackPage'));
const ProfilePage = lazy(() => import('@/Pages/ProfilePage'));
const DetailPage = lazy(() => import('@/Pages/Detail'));
const WatchlistPage = lazy(() => import('@/Pages/WatchlistPage'));

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/sign-in/*', element: <SignInPage /> },
        { path: '/sign-up/*', element: <SignUpPage /> },
        { path: '/auth-callback', element: <AuthCallbackPage /> },
        { path: '/user-profile', element: <ProfilePage /> },
        { path: '/watchlist', element: <WatchlistPage /> },
        { path: '/stock/:symbol', element: <DetailPage /> },
      ],
    },
  ],
  // { basename: '/stocky-client' },
);

export default router;
