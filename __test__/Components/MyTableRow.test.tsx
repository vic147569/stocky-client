import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { useGetStockQuote, useGetStockRecommendation } from '@/Api/StockApi';
import MyTableRow from '@/Components/MyTableRow';

// Mock the useNavigate hook
const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('@/Api/StockApi');

describe('MyTableRow', () => {
  it('should show loading state initially', () => {
    // Mock loading states
    (useGetStockQuote as jest.Mock).mockReturnValueOnce({
      data: {},
      isLoading: true,
    });
    (useGetStockRecommendation as jest.Mock).mockReturnValueOnce({
      isLoading: true,
    });

    render(
      <BrowserRouter>
        <MyTableRow symbol="AAPL" />
      </BrowserRouter>,
    );

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should render stock data correctly', async () => {
    (useGetStockQuote as jest.Mock).mockReturnValueOnce({
      data: {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        last: 142.02,
        change: 2.45,
        changePercent: 1.75,
      },
      isLoading: false,
    });
    (useGetStockRecommendation as jest.Mock).mockReturnValueOnce({
      data: { result: 'Buy' },
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <MyTableRow symbol="AAPL" />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('AAPL')).toBeInTheDocument();
      expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
      expect(screen.getByText('142.02')).toBeInTheDocument();
      expect(screen.getByText('2.45')).toBeInTheDocument();
      expect(screen.getByText('1.75')).toBeInTheDocument();
      expect(screen.getByText('Buy')).toBeInTheDocument();
      const recommendationElement = screen.getByText('Buy');
      const changeElement = screen.getByText('2.45');
      expect(recommendationElement).toHaveClass('text-green-500');
      expect(changeElement).toHaveClass('text-green-500');
    });
  });

  it('should render stock data correctly', async () => {
    (useGetStockQuote as jest.Mock).mockReturnValueOnce({
      data: {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        last: 142.02,
        change: -2.45,
        changePercent: 1.75,
      },
      isLoading: false,
    });
    (useGetStockRecommendation as jest.Mock).mockReturnValueOnce({
      data: { result: 'Sell' },
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <MyTableRow symbol="AAPL" />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('AAPL')).toBeInTheDocument();
      expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
      expect(screen.getByText('142.02')).toBeInTheDocument();
      expect(screen.getByText('-2.45')).toBeInTheDocument();
      expect(screen.getByText('1.75')).toBeInTheDocument();
      expect(screen.getByText('Sell')).toBeInTheDocument();
      const recommendationElement = screen.getByText('Sell');
      const changeElement = screen.getByText('-2.45');
      expect(recommendationElement).toHaveClass('text-red-500');
      expect(changeElement).toHaveClass('text-red-500');
    });
  });

  it('should navigate to stock detail page on row click', async () => {
    (useGetStockQuote as jest.Mock).mockReturnValueOnce({
      data: {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        last: 142.02,
        change: 2.45,
        changePercent: 1.75,
      },
      isLoading: false,
    });
    (useGetStockRecommendation as jest.Mock).mockReturnValueOnce({
      data: { result: 'Buy' },
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <MyTableRow symbol="AAPL" />
      </BrowserRouter>,
    );

    await waitFor(() => screen.getByText('AAPL'));

    const row = screen.getByText('AAPL').closest('tr');
    if (row) {
      userEvent.click(row);
    }
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/stock/AAPL'));
    // expect(navigateMock).toHaveBeenCalledWith('/stock/AAPL');
  });
});
