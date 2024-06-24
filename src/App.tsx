import { Outlet, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import AppFooter from './Components/AppFooter';
import AppHeader from './Components/AppHeader';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <main className=" container mx-auto flex-1 py-10 flex my-auto">
          <Outlet />
        </main>
        <AppFooter />
      </div>
    </ClerkProvider>
  );
};
export default App;
