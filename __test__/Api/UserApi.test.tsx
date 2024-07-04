/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import * as clerk from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useCreateUser, useGetUser, useUpdateUser } from '@/Api/UserApi';

const API_BASE_URL = 'http://localhost:3000';
vi.stubGlobal('import.meta', {
  env: {
    VITE_API_BASE_URL: API_BASE_URL,
  },
});

vi.mock('@clerk/clerk-react');

const queryClient = new QueryClient({});

const wrapper: React.JSXElementConstructor<{
  children: React.ReactNode;
}> = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => {
  vi.clearAllMocks();
  queryClient.clear();
});

describe('useCreateUser', () => {
  it('should create a user successfully', async () => {
    const mockGetToken = vi.fn().mockResolvedValue('mock-token');
    (clerk as any).useAuth = vi.fn().mockReturnValue({ getToken: mockGetToken });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const { result } = renderHook(() => useCreateUser(), { wrapper });

    await result.current.createUser({ userId: '123', name: 'John Doe', email: 'aaa@gmail.com' });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isSuccess).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/user`, expect.any(Object));
  });

  it('should handle create user error', async () => {
    const mockGetToken = vi.fn().mockResolvedValue('mock-token');
    (clerk as any).useAuth = vi.fn().mockReturnValue({ getToken: mockGetToken });

    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useCreateUser(), { wrapper });

    await waitFor(() =>
      expect(
        async () => await result.current.createUser({ userId: '123', name: 'John Doe', email: 'aaa@gmail.com' }),
      ).rejects.toThrowError(),
    );

    expect(result.current.isError).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/user`, expect.any(Object));
  });
});

describe('useGetUser', () => {
  it('should fetch user data successfully', async () => {
    const mockGetToken = vi.fn().mockResolvedValue('mock-token');
    (clerk as any).useAuth.mockReturnValue({ getToken: mockGetToken });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'John Doe' }),
    });

    const { result } = renderHook(() => useGetUser(), { wrapper });

    await waitFor(() => !result.current.isLoading);

    await waitFor(() => expect(result.current.data).toEqual({ name: 'John Doe' }));
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle fetch user error', async () => {
    const mockGetToken = vi.fn().mockResolvedValue('mock-token');
    (clerk as any).useAuth.mockReturnValue({ getToken: mockGetToken });

    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useGetUser(), { wrapper });

    await waitFor(() => !result.current.isLoading);

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
  });
});

describe('useUpdateUser', () => {
  it('should update user successfully', async () => {
    const mockGetToken = vi.fn().mockResolvedValue('mock-token');
    (clerk as any).useAuth.mockReturnValue({ getToken: mockGetToken });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'John Doe' }),
    });

    const { result } = renderHook(() => useUpdateUser(), { wrapper });

    await result.current.updateUser({ name: 'John Doe Updated', email: 'aaa@gmail.com', phone: '123123123' });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
  });

  it('should handle update user error', async () => {
    const mockGetToken = vi.fn().mockResolvedValue('mock-token');
    (clerk as any).useAuth.mockReturnValue({ getToken: mockGetToken });

    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useUpdateUser(), { wrapper });

    await waitFor(() =>
      expect(
        async () =>
          await result.current.updateUser({ name: 'John Doe Updated', email: 'aaa@gmail.com', phone: '123123123' }),
      ).rejects.toThrow(Error),
    );
  });
});
