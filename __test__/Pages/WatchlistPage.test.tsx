import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from 'react-query';
import WatchlistPage from '@/Pages/WatchlistPage';
import { useGetWatchlist } from '@/Api/WatchlistApi';

vi.mock('@/Api/WatchlistApi', () => ({
  useGetWatchlist: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

// Mock react query
const queryClient = new QueryClient();
const wrapper: React.JSXElementConstructor<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('WatchlistPage', () => {
  const mockUseGetWatchlist = vi.fn().mockImplementation(useGetWatchlist);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the watchlist table with data', () => {
    const watchlist = {
      stockList: ['AAPL', 'GOOGL', 'AMZN'],
    };
    (useGetWatchlist as jest.Mock).mockReturnValue({ data: watchlist });

    render(<WatchlistPage />, { wrapper });

    waitFor(() => {
      expect(screen.getByText('Watchlist')).toBeInTheDocument();
      expect(screen.getByText('Your watchlist')).toBeInTheDocument();
      expect(screen.getByText('Symbol')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Last')).toBeInTheDocument();
      expect(screen.getByText('Change')).toBeInTheDocument();
      expect(screen.getByText('Change%')).toBeInTheDocument();
      expect(screen.getByText('Recommendation')).toBeInTheDocument();
      expect(screen.getByText('AAPL')).toBeInTheDocument();
      expect(screen.getByText('GOOGL')).toBeInTheDocument();
      expect(screen.getByText('AMZN')).toBeInTheDocument();
    });
  });

  it('renders empty watchlist message when there is no data', () => {
    mockUseGetWatchlist.mockReturnValue({ data: { stockList: [] } });

    render(<WatchlistPage />, { wrapper });

    waitFor(() => {
      expect(screen.getByText('Watchlist')).toBeInTheDocument();
      expect(screen.getByText('Your watchlist')).toBeInTheDocument();
      expect(screen.queryByText('AAPL')).not.toBeInTheDocument();
      expect(screen.queryByText('GOOGL')).not.toBeInTheDocument();
      expect(screen.queryByText('AMZN')).not.toBeInTheDocument();
    });
  });
});
