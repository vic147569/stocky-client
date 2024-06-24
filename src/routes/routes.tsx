import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import HomePage from '@/pages/Home';
import SignInPage from '@/pages/sign-in';
import SignUpPage from '@/pages/sign-up';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/sign-in/*', element: <SignInPage /> },
      { path: '/sign-up/*', element: <SignUpPage /> },
    ],
  },
]);

export default router;
