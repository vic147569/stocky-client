/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as clerk from '@clerk/clerk-react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import MobileNav from '@/Components/Nav/MobileNav';

vi.mock('@clerk/clerk-react', () => ({
  useAuth: vi.fn(),
  useUser: vi.fn(),
  SignInButton: vi.fn(({ children }) => <div data-testid="sign-in-button">{children}</div>),
  SignOutButton: vi.fn(({ children }) => <div data-testid="sign-out-button">{children}</div>),
}));

const mockGetToken = vi.fn().mockResolvedValue('mock-token');
(clerk as any).useAuth = vi.fn().mockReturnValue({ getToken: mockGetToken });
(clerk as any).useUser = vi.fn().mockReturnValue({ user: { fullName: 'John Doe' } });

describe('MobileNav', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders SignInButton when user is not signed in', () => {
    (clerk as any).useAuth.mockReturnValue({ isSignedIn: false });

    render(<MobileNav />);

    fireEvent.click(screen.getByRole('button')); // Trigger the menu

    expect(screen.getByTestId('sign-in-button')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('renders user email and MobileMenu when user is signed in', () => {
    const user = { emailAddresses: [{ emailAddress: 'test@example.com' }] };
    (clerk as any).useAuth.mockReturnValue({ isSignedIn: true });
    (clerk as any).useUser.mockReturnValue({ user });

    render(
      <BrowserRouter>
        <MobileNav />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByRole('button')); // Trigger the menu

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Watch List')).toBeInTheDocument();
  });

  it('renders welcome message when user is not signed in', () => {
    (clerk as any).useAuth.mockReturnValue({ isSignedIn: false });

    render(<MobileNav />);

    fireEvent.click(screen.getByRole('button')); // Trigger the menu

    expect(screen.getByText('Welcome to Stocky')).toBeInTheDocument();
  });
});
