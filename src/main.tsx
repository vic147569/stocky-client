import ReactDOM from 'react-dom/client';
import './global.css';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>,
);
