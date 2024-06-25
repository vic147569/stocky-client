import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import HomePage from '@/Pages/Home';
import SignInPage from '@/Pages/sign-in';
import SignUpPage from '@/Pages/sign-up';
import AuthCallbackPage from '@/Pages/AuthCallbackPage';

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
