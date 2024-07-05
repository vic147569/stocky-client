/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from 'react-query';
import ChartCard from '@/Components/ChartCard';
import { useGetStockHistory } from '@/Api/StockApi';
import LineChart from '@/Components/Chart';

// Mock the useGetStockHistory hook
vi.mock('@/Api/StockApi');
vi.mock('@/Components/Chart', () => ({
  __esModule: true,
  default: vi.fn(() => <div>LineChart Mock</div>),
}));

// Mock react query
const queryClient = new QueryClient();
const wrapper: React.JSXElementConstructor<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

// Mock the ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Stub the global ResizeObserver
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

describe('ChartCard', () => {
  it('should display loading state', async () => {
    // Mock the loading state
    (useGetStockHistory as jest.Mock).mockReturnValue({
      data: {
        price: [
          { date: '2023-01-01', close: 100 },
          { date: '2023-07-01', close: 150 },
        ],
      },
      isLoading: true,
    });

    render(<ChartCard symbol="AAPL" />, { wrapper });

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should not render if no stock history', () => {
    // Mock the state with no data
    (useGetStockHistory as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    const { container } = render(<ChartCard symbol="AAPL" />, { wrapper });

    expect(container).toBeEmptyDOMElement();
  });

  it('should render chart with stock history data', () => {
    // Mock the state with stock data
    (useGetStockHistory as jest.Mock).mockReturnValue({
      data: {
        price: [
          { date: '2023-01-01', close: 100 },
          { date: '2023-07-01', close: 150 },
        ],
      },
      isLoading: false,
    });

    render(<ChartCard symbol="AAPL" />, { wrapper });

    expect(screen.getByText('Chart')).toBeInTheDocument();
    expect(screen.getByText('YTD chart')).toBeInTheDocument();
  });

  it('should render chart with stock history data', () => {
    // Mock the state with stock data
    const stockData = {
      price: [
        { date: '2023-01-01', close: 100 },
        { date: '2023-07-01', close: 150 },
      ],
    };
    (useGetStockHistory as jest.Mock).mockReturnValue({
      data: stockData,
      isLoading: false,
    });

    render(<ChartCard symbol="AAPL" />, { wrapper });

    expect(screen.getByText('Chart')).toBeInTheDocument();
    expect(screen.getByText('YTD chart')).toBeInTheDocument();
    expect(screen.getByText('LineChart Mock')).toBeInTheDocument();

    // Verify that the LineChart receives the correct themeColor prop
    const chartMock = LineChart as jest.Mock;
    const expectedData = stockData.price.map((item) => ({
      date: new Date(item.date),
      value: item.close,
    }));
    expect(chartMock).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expectedData,
        themeColor: '#22c55e', // green color for increasing stock
      }),
      {},
    );
  });

  it('should render chart with red theme color for decreasing stock', () => {
    // Mock the state with stock data where the price decreases
    const stockData = {
      price: [
        { date: '2023-01-01', close: 150 },
        { date: '2023-07-01', close: 100 },
      ],
    };
    (useGetStockHistory as jest.Mock).mockReturnValue({
      data: stockData,
      isLoading: false,
    });

    render(<ChartCard symbol="AAPL" />, { wrapper });

    expect(screen.getByText('Chart')).toBeInTheDocument();
    expect(screen.getByText('YTD chart')).toBeInTheDocument();
    expect(screen.getByText('LineChart Mock')).toBeInTheDocument();

    // Verify that the LineChart receives the correct themeColor prop
    const chartMock = LineChart as jest.Mock;
    const expectedData = stockData.price.map((item) => ({
      date: new Date(item.date),
      value: item.close,
    }));
    expect(chartMock).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expectedData,
        themeColor: '#ef4444', // red color for decreasing stock
      }),
      {},
    );
  });
});
