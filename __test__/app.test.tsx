import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';

// Mock useNavigate from react-router-dom
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
  BrowserRouter: vi.fn().mockImplementation((props) => props.children),
  Outlet: vi.fn().mockImplementation((props) => props.children),
  Link: vi.fn().mockImplementation((props) => props.children),
}));

// Mock ClerkProvider
vi.mock('@clerk/clerk-react', () => ({
  useAuth: () => vi.fn(),
  useUser: () => vi.fn(),
  SignedOut: vi.fn().mockImplementation((props) => props.children),
  SignedIn: vi.fn().mockImplementation((props) => props.children),
  UserButton: vi.fn().mockImplementation((props) => props.children),
  ClerkProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock QueryClientProvider
vi.mock('react-query', () => ({
  ...vi.importActual('react-query'),
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  QueryClient: class {
    // constructor() {}
  },
}));

// Mock Toaster
vi.mock('sonner', () => ({
  Toaster: () => <div>Toaster</div>,
}));

// Mock import.meta.env
vi.stubGlobal('import.meta', {
  env: {
    VITE_CLERK_PUBLISHABLE_KEY: 'test-publishable-key',
    VITE_CLERK_SIGN_UP_FORCE_REDIRECT_URL: 'http://test-signup-redirect-url',
  },
});

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    // Check if the Layout component is rendered
    expect(screen.getByText('Toaster')).toBeInTheDocument();
  });
});
