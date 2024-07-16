/* eslint-disable react/jsx-no-useless-fragment */
import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import HomePage from '@/Pages/Home';
import SignInPage from '@/Pages/sign-in';
import SignUpPage from '@/Pages/sign-up';
import AuthCallbackPage from '@/Pages/AuthCallbackPage';
import ProfilePage from '@/Pages/ProfilePage';
import DetailPage from '@/Pages/Detail';
import WatchlistPage from '@/Pages/WatchlistPage';

const router = createBrowserRouter(
  [
    {
      element: <App />,
      children: [
        {
          path: '/',
          element: (
            <>
              <HomePage />
            </>
          ),
        },
        {
          path: '/sign-in/*',
          element: (
            <>
              <SignInPage />
            </>
          ),
        },
        {
          path: '/sign-up/*',
          element: (
            <>
              <SignUpPage />
            </>
          ),
        },
        {
          path: '/auth-callback',
          element: (
            <>
              <AuthCallbackPage />
            </>
          ),
        },
        {
          path: '/user-profile',
          element: (
            <>
              <ProfilePage />
            </>
          ),
        },
        {
          path: '/watchlist',
          element: (
            <>
              <WatchlistPage />
            </>
          ),
        },
        {
          path: '/stock/:symbol',
          element: (
            <>
              <DetailPage />
            </>
          ),
        },
      ],
    },
  ],
  { basename: '/stocky-client' },
);

export default router;
