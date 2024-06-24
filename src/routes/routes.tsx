import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import HomePage from '@/pages/Home';
import SignInPage from '@/pages/sign-in';
import SignUpPage from '@/pages/sign-up';
import AuthCallbackPage from '@/pages/AuthCallbackPage';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/sign-in/*', element: <SignInPage /> },
      { path: '/sign-up/*', element: <SignUpPage /> },
      { path: '/auth-callback', element: <AuthCallbackPage /> },
    ],
  },
]);

export default router;
