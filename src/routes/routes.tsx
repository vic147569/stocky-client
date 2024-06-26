import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import HomePage from '@/Pages/Home';
import SignInPage from '@/Pages/sign-in';
import SignUpPage from '@/Pages/sign-up';
import AuthCallbackPage from '@/Pages/AuthCallbackPage';
import ProfilePage from '@/Pages/ProfilePage';
import WatchListPage from '@/Pages/WatchListPage';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/sign-in/*', element: <SignInPage /> },
      { path: '/sign-up/*', element: <SignUpPage /> },
      { path: '/auth-callback', element: <AuthCallbackPage /> },
      { path: '/user-profile', element: <ProfilePage /> },
      { path: '/watchlist', element: <WatchListPage /> },
    ],
  },
]);

export default router;
