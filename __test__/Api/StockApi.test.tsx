import { vi, describe, it, expect, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useGetStockQuote, useGetStockHistory, useGetStockRecommendation } from '@/Api/StockApi';
import { StockQuote, StockHistory, StockRecommendation } from '@/types';

// Mock environment variable
const API_BASE_URL = 'http://localhost:3000';
vi.stubGlobal('import.meta', {
  env: {
    VITE_API_BASE_URL: API_BASE_URL,
  },
});

// Mock fetch
const mockFetch = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
  global.fetch = mockFetch;
});

describe('useGetStockQuote', () => {
  it('should return stock quote data on success', async () => {
    const mockData: StockQuote = {
      _id: '123123123',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      sector: 'Technology',
      last: 123,
      open: 345,
      close: 456,
      vol: 123123123,
      change: 12,
      changePercent: 1.034,
      dayHigh: 12312,
      dayLow: 123,
      yearHigh: 234,
      yearLow: 123,
      dividend: 12,
      EPS: 1,
      PE: 1,
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const queryClient = new QueryClient();
    const { result } = renderHook(() => useGetStockQuote('AAPL'), {
      wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/stocks/quote/AAPL`);
  });

  it('should throw an error on failure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          // ✅ turns retries off
          retry: false,
        },
      },
    });
    const { result } = renderHook(() => useGetStockQuote('AAPL'), {
      wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
    });

    await waitFor(() => result.current.isError);

    await waitFor(() => expect(result.current.error).toBeInstanceOf(Error));
    expect(result.current.error!.message).toBe('Network response was not ok');
  });
});

describe('useGetStockHistory', () => {
  it('should return stock history data on success', async () => {
    const mockData: StockHistory = {
      symbol: 'AAPL',
      price: [
        {
          date: new Date('2021-02-01T00:00:00.000Z'),
          open: 814.289978,
          high: 842,
          low: 795.559998,
          close: 839.809998,
          adjClose: 839.809998,
          volume: 25391400,
        },
        {
          date: new Date('2021-02-02T00:00:00.000Z'),
          open: 844.679993,
          high: 880.5,
          low: 842.200623,
          close: 872.789978,
          adjClose: 872.789978,
          volume: 24346213,
        },
      ],
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const queryClient = new QueryClient();
    const { result } = renderHook(() => useGetStockHistory('AAPL'), {
      wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/stocks/history/AAPL`);
  });

  it('should throw an error on failure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          // ✅ turns retries off
          retry: false,
        },
      },
    });
    const { result } = renderHook(() => useGetStockHistory('AAPL'), {
      wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
    });

    await waitFor(() => result.current.isError);

    await waitFor(() => expect(result.current.error).toBeInstanceOf(Error));
    expect(result.current.error!.message).toBe('Cannot get stock history');
  });
});

describe('useGetStockRecommendation', () => {
  it('should return stock recommendation data on success', async () => {
    const mockData: StockRecommendation = {
      result: 'Strong Buy',
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const queryClient = new QueryClient();
    const { result } = renderHook(() => useGetStockRecommendation('AAPL'), {
      wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/stocks/recommendation/AAPL`);
  });

  it('should throw an error on failure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          // ✅ turns retries off
          retry: false,
        },
      },
    });
    const { result } = renderHook(() => useGetStockRecommendation('AAPL'), {
      wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
    });

    await waitFor(() => result.current.isError);

    await waitFor(() => expect(result.current.error).toBeInstanceOf(Error));
    expect(result.current.error!.message).toBe('Cannot get stock recommendation');
  });
});
