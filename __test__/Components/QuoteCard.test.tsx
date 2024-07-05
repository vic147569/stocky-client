import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from 'react-query';
import QuoteCard from '@/Components/QuoteCard';
import { useGetStockQuote, useGetStockRecommendation } from '@/Api/StockApi';
import { useGetIsInWatchlist, useUpdateWatchlist } from '@/Api/WatchlistApi';

// Mock useParams hook
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useParams: () => ({ symbol: 'AAPL' }), // Mock symbol for testing purposes
}));

vi.mock('@/Api/StockApi');
vi.mock('@/Api/WatchlistApi');

// Mock react query
const queryClient = new QueryClient();
const wrapper: React.JSXElementConstructor<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

// Mock API methods used in the component
vi.doMock('@/Api/StockApi', () => ({
  useGetStockQuote: () => ({
    data: {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      last: 142.02,
      dayHigh: 144.57,
      dayLow: 141.28,
      change: 2.45,
      changePercent: 1.75,
      vol: 25000000,
      open: 141.2,
      close: 139.57,
      dividend: 0.82,
      EPS: 4.25,
      PE: 33.42,
    },
    isLoading: false,
  }),
  useGetStockRecommendation: () => ({
    data: { result: 'Buy' },
    isLoading: false,
  }),
  useGetIsInWatchlist: () => ({
    data: { isInWatchlist: true },
    isLoading: false,
  }),
  useUpdateWatchlist: () => ({
    updateWatchlist: async () => ({
      stockList: ['AAPL'],
    }),
  }),
}));

describe('QuoteCard', () => {
  it('should render stock not found if stock not found', () => {
    // Mock loading states
    (useGetStockQuote as jest.Mock).mockReturnValueOnce({
      isLoading: true,
    });
    (useGetStockRecommendation as jest.Mock).mockReturnValueOnce({
      isLoading: true,
    });
    (useGetIsInWatchlist as jest.Mock).mockReturnValueOnce({
      isLoading: true,
    });
    (useUpdateWatchlist as jest.Mock).mockReturnValue({});

    render(<QuoteCard />, { wrapper });

    // Verify loading text is displayed
    expect(screen.getByText('Stock not found')).toBeInTheDocument();
  });

  it('should render loading state initially', () => {
    // Mock loading states
    (useGetStockQuote as jest.Mock).mockReturnValueOnce({
      data: {},
      isLoading: true,
    });
    (useGetStockRecommendation as jest.Mock).mockReturnValueOnce({
      isLoading: true,
    });
    (useGetIsInWatchlist as jest.Mock).mockReturnValueOnce({
      isLoading: true,
    });
    (useUpdateWatchlist as jest.Mock).mockReturnValue({});

    render(<QuoteCard />, { wrapper });

    // Verify loading text is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render quote information when data is loaded', async () => {
    (useGetStockQuote as jest.Mock).mockReturnValue({
      data: {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        last: 142.02,
        dayHigh: 144.57,
        dayLow: 141.28,
        change: 2.45,
        changePercent: 1.75,
        vol: 25000000,
        open: 141.2,
        close: 139.57,
        dividend: 0.82,
        EPS: 4.25,
        PE: 33.42,
      },
      isLoading: false,
    });
    (useGetStockRecommendation as jest.Mock).mockReturnValueOnce({
      data: { result: 'Buy' },
      isLoading: false,
    });
    (useGetIsInWatchlist as jest.Mock).mockReturnValueOnce({
      data: { isInWatchlist: true },
      isLoading: false,
    });
    render(<QuoteCard />);

    // Wait for the component to finish loading
    await waitFor(() => {
      // Verify quote information is displayed
      const stockNameElement = screen.getByText('Apple Inc.');
      const lastPriceElement = screen.getByText('142.02');
      const changeElement = screen.getByText('2.45');

      expect(stockNameElement).toBeInTheDocument();
      expect(lastPriceElement).toBeInTheDocument();
      expect(changeElement).toBeInTheDocument();
    });
  });

  it('should handle watchlist toggle correctly', async () => {
    (useGetStockRecommendation as jest.Mock).mockReturnValueOnce({
      data: { result: 'Buy' },
      isLoading: false,
    });
    (useGetIsInWatchlist as jest.Mock).mockReturnValueOnce({
      data: { isInWatchlist: true },
      isLoading: false,
    });
    (useUpdateWatchlist as jest.Mock).mockReturnValueOnce({
      updateWatchlist: async () => ({
        stockList: ['AAPL'],
      }),
    });

    render(<QuoteCard />);

    // Wait for the component to finish loading
    await waitFor(() => {
      // Simulate toggle action
      const toggleButton = screen.getByTestId('toggle-button');
      fireEvent.click(toggleButton);
    });

    // Wait for state update
    await waitFor(() => {
      // Verify toggle status is updated
      const starIcon = screen.getByTestId('star-icon-filled');
      expect(starIcon).toBeInTheDocument();
    });
  });

  it('should handle recommendation color based on data', async () => {
    (useGetStockQuote as jest.Mock).mockReturnValue({
      data: {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        last: 142.02,
        dayHigh: 144.57,
        dayLow: 141.28,
        change: 2.45,
        changePercent: 1.75,
        vol: 25000000,
        open: 141.2,
        close: 139.57,
        dividend: 0.82,
        EPS: 4.25,
        PE: 33.42,
      },
      isLoading: false,
    });
    (useGetStockRecommendation as jest.Mock).mockReturnValueOnce({
      data: { result: 'Buy' },
      isLoading: false,
    });
    (useGetIsInWatchlist as jest.Mock).mockReturnValueOnce({
      data: { isInWatchlist: true },
      isLoading: false,
    });

    render(<QuoteCard />);

    // Wait for the component to finish loading
    await waitFor(() => {
      // Verify recommendation color is applied correctly
      const recommendationElement = screen.getByText('Buy');
      expect(recommendationElement).toHaveClass('text-green-500');
    });
  });

  it('should handle recommendation color based on data', async () => {
    (useGetStockQuote as jest.Mock).mockReturnValue({
      data: {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        last: 142.02,
        dayHigh: 144.57,
        dayLow: 141.28,
        change: -2.45,
        changePercent: 1.75,
        vol: 25000000,
        open: 141.2,
        close: 139.57,
        dividend: 0.82,
        EPS: 4.25,
        PE: 33.42,
      },
      isLoading: false,
    });
    (useGetStockRecommendation as jest.Mock).mockReturnValueOnce({
      data: { result: 'Sell' },
      isLoading: false,
    });
    (useGetIsInWatchlist as jest.Mock).mockReturnValueOnce({
      data: { isInWatchlist: true },
      isLoading: false,
    });

    render(<QuoteCard />);

    // Wait for the component to finish loading
    await waitFor(() => {
      // Verify recommendation color is applied correctly
      const recommendationElement = screen.getByText('Sell');
      const changeElement = screen.getByText('-2.45');
      expect(recommendationElement).toHaveClass('text-red-500');
      expect(changeElement).toHaveClass('text-red-500');
    });
  });
});
