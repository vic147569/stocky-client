import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { vi } from 'vitest';
import AuthCallbackPage from '@/Pages/AuthCallbackPage';
import { useCreateUser } from '@/Api/UserApi';
import { useCreateWatchlist } from '@/Api/WatchlistApi';

vi.mock('@clerk/clerk-react', () => ({
  useUser: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('@/Api/UserApi', () => ({
  useCreateUser: vi.fn(),
}));

vi.mock('@/Api/WatchlistApi', () => ({
  useCreateWatchlist: vi.fn(),
}));

describe('AuthCallbackPage', () => {
  const mockNavigate = vi.fn();
  const mockCreateUser = vi.fn();
  const mockCreateWatchlist = vi.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useCreateUser as jest.Mock).mockReturnValue({ createUser: mockCreateUser });
    (useCreateWatchlist as jest.Mock).mockReturnValue({ createWatchlist: mockCreateWatchlist });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading message', () => {
    (useUser as jest.Mock).mockReturnValue({ user: null });

    render(<AuthCallbackPage />);

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('creates user and watchlist, then navigates to home', async () => {
    (useUser as jest.Mock).mockReturnValue({
      user: {
        id: 'user123',
        primaryEmailAddress: { emailAddress: 'user@example.com' },
        fullName: 'John Doe',
      },
    });

    render(<AuthCallbackPage />);

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith({
        userId: 'user123',
        name: 'John Doe',
        email: 'user@example.com',
      });

      expect(mockCreateWatchlist).toHaveBeenCalledWith({
        userId: 'user123',
        stockList: [],
      });

      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('does not create user and watchlist multiple times', async () => {
    (useUser as jest.Mock).mockReturnValue({
      user: {
        id: 'user123',
        primaryEmailAddress: { emailAddress: 'user@example.com' },
        fullName: 'John Doe',
      },
    });

    render(<AuthCallbackPage />);

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledTimes(1);
      expect(mockCreateWatchlist).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
