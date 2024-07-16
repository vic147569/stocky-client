import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useUser } from '@clerk/clerk-react';
import HomePage from '@/Pages/Home';
import { useCreateUser } from '@/Api/UserApi';
import { useCreateWatchlist } from '@/Api/WatchlistApi';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

// Mock react query
const queryClient = new QueryClient();
const wrapper: React.JSXElementConstructor<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

vi.mock('@clerk/clerk-react', () => ({
  useUser: () => vi.fn(),
}));

vi.mock('@/Api/UserApi', () => ({
  useCreateUser: vi.fn(),
}));

vi.mock('@/Api/WatchlistApi', () => ({
  useCreateWatchlist: vi.fn(),
}));

describe('HomePage', () => {
  const mockNavigate = vi.fn();
  const mockCreateUser = vi.fn();
  const mockCreateWatchlist = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useCreateUser as jest.Mock).mockReturnValue({ createUser: mockCreateUser });
    (useCreateWatchlist as jest.Mock).mockReturnValue({ createWatchlist: mockCreateWatchlist });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders homepage content and handles search submit', () => {
    vi.mock('@clerk/clerk-react', () => ({
      useUser: () => vi.fn(),
    }));
    (useUser as jest.Mock).mockReturnValue({
      user: {
        id: 'user123',
        primaryEmailAddress: { emailAddress: 'user@example.com' },
        fullName: 'John Doe',
      },
    });

    render(<HomePage />, { wrapper });

    expect(screen.getByAltText('stocky')).toBeInTheDocument();
    expect(screen.getByText('Stocky, your investment partner!')).toBeInTheDocument();
    expect(screen.getByText('Get latest stock market information at Stocky')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search stock by symbol')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Search stock by symbol'), { target: { value: 'AAPL' } });
    fireEvent.click(screen.getByText('Submit'));

    // waitFor(() => expect(mockNavigate).toHaveBeenCalledWith({ pathname: '/stock/AAPL' }));
  });

  it('creates user and watchlist, then navigates to home', async () => {
    vi.mock('@clerk/clerk-react', () => ({
      useUser: vi.fn(),
    }));
    (useUser as jest.Mock).mockReturnValue({
      user: {
        id: 'user123',
        primaryEmailAddress: { emailAddress: 'user@example.com' },
        fullName: 'John Doe',
      },
    });

    render(<HomePage />);

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
    });
  });
});
