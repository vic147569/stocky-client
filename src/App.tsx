import { Outlet, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'sonner';
import Layout from './Layout/layout';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//   throw new Error('Missing Publishable Key');
// }

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  const navigate = useNavigate();

  const SIGNUP_URL = import.meta.env.VITE_CLERK_SIGN_UP_FORCE_REDIRECT_URL;
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider
        routerPush={(to) => navigate(to)}
        routerReplace={(to) => navigate(to, { replace: true })}
        publishableKey={PUBLISHABLE_KEY}
        signUpForceRedirectUrl={SIGNUP_URL}
      >
        <Layout>
          <Outlet />
          <Toaster visibleToasts={1} position="top-right" richColors />
        </Layout>
      </ClerkProvider>
    </QueryClientProvider>
  );
};
export default App;
