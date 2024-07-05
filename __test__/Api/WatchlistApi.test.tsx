/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, QueryClientProvider } from 'react-query';
import * as clerk from '@clerk/clerk-react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useCreateWatchlist, useGetIsInWatchlist, useGetWatchlist, useUpdateWatchlist } from '@/Api/WatchlistApi';

const API_BASE_URL = 'http://localhost:3000';
vi.stubGlobal('import.meta', {
  env: {
    VITE_API_BASE_URL: API_BASE_URL,
  },
});

// mock query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
});
const wrapper: React.JSXElementConstructor<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

// mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// mock token
vi.mock('@clerk/clerk-react');
const mockGetToken = vi.fn().mockResolvedValue('mock-token');
(clerk as any).useAuth = vi.fn().mockReturnValue({ getToken: mockGetToken });

// reset
beforeEach(() => {
  vi.clearAllMocks();
  queryClient.clear();
});

describe('useCreateWatchlist', () => {
  it('should create watchlist successfully', async () => {
    // mock fetch res
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {},
    });

    const { result } = renderHook(() => useCreateWatchlist(), { wrapper });

    await act(() => result.current.createWatchlist({ userId: '123123', stockList: [] }));

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isSuccess).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/watchlist`, expect.any(Object));
  });

  it('should handle create watchlist error', async () => {
    // mock fetch res
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });
    const { result } = renderHook(() => useCreateWatchlist(), { wrapper });

    await waitFor(() =>
      expect(async () => await result.current.createWatchlist({ userId: '123123', stockList: [] })).rejects.toThrow(
        Error,
      ),
    );

    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/watchlist`, expect.any(Object));
  });
});

describe('useGetWatchlist', () => {
  it('should fetch watchlist data successfully', async () => {
    // mock fetch res
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ userId: '123123', stockList: ['AAPL', 'NVDA'] }),
    });
    const { result } = renderHook(() => useGetWatchlist(), { wrapper });

    await waitFor(() => !result.current.isLoading);
    await waitFor(() => expect(result.current.data).toEqual({ userId: '123123', stockList: ['AAPL', 'NVDA'] }));

    expect(result.current.isLoading).toBe(false);
  });

  it('should handle fetch watchlist error', async () => {
    // mock fetch res
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });
    const { result } = renderHook(() => useGetWatchlist(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toBeUndefined();
    expect(result.current.isError).toBe(true);
    expect(result.current.isSuccess).toBe(false);
  });
});

describe('useUpdateWatchlist', () => {
  it('should update watchlist successfully', async () => {
    // mock fetch res
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ userId: '123123', stockList: ['AAPL', 'NVDA'] }),
    });

    const { result } = renderHook(() => useUpdateWatchlist('NVDA'), { wrapper });

    await act(() => result.current.updateWatchlist());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('should handle update watchlist error', async () => {
    // mock fetch res
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useUpdateWatchlist('NVDA'), { wrapper });

    await waitFor(() => expect(async () => await result.current.updateWatchlist()).rejects.toThrow(Error));
  });
});

describe('useGetIsInWatchlist', () => {
  it('should fetch a stock in watchlist or not', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => ({ isInWatchlist: true }),
    });
    const { result } = renderHook(() => useGetIsInWatchlist('AAPL'), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await waitFor(() => expect(result.current.data).toEqual({ isInWatchlist: true }));
  });

  it('should handle fetch isInWatchlist error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });
    const { result } = renderHook(() => useGetIsInWatchlist('AAPL'), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await waitFor(() => expect(result.current.data).toBeUndefined());
  });
});
