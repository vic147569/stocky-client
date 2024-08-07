import { useAuth } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'react-query';
import { GetToken } from '@clerk/types';
import { CreateWatchlistRequest, IsInWatchlist, Watchlist } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateWatchlist = () => {
  const { getToken } = useAuth();
  const createWatchlistRequest = async (watchlist: CreateWatchlistRequest) => {
    const token = await getToken();
    const response = await fetch(`${API_BASE_URL}/api/watchlist`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(watchlist),
    });

    if (!response.ok) {
      throw new Error('Failed to create watchlist');
    }
  };
  const { mutateAsync: createWatchlist, isLoading, isSuccess } = useMutation(createWatchlistRequest);
  return { createWatchlist, isLoading, isSuccess };
};

const getWatchlistRequest = async (getToken: GetToken): Promise<Watchlist> => {
  const token = await getToken();
  const response = await fetch(`${API_BASE_URL}/api/watchlist`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to get watchlist');
  }
  return response.json();
};
export const useGetWatchlist = () => {
  const { getToken } = useAuth();
  return useQuery(['fetchWatchlist'], () => getWatchlistRequest(getToken));
};

export const useUpdateWatchlist = (symbol?: string) => {
  const { getToken } = useAuth();
  const updateWatchlistRequest = async (): Promise<Watchlist> => {
    const token = await getToken();
    const response = await fetch(`${API_BASE_URL}/api/watchlist/${symbol}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to update watchlist');
    }
    return response.json();
  };

  const { mutateAsync: updateWatchlist, isSuccess, isLoading, error } = useMutation(updateWatchlistRequest);

  return { updateWatchlist, isSuccess, isLoading, error };
};

const getIsInWatchlistRequest = async (symbol: string, getToken: GetToken): Promise<IsInWatchlist> => {
  const token = await getToken();
  const response = await fetch(`${API_BASE_URL}/api/watchlist/${symbol}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to get isInWatchlist');
  }
  return response.json();
};
export const useGetIsInWatchlist = (symbol?: string) => {
  const { getToken } = useAuth();
  return useQuery(['isInWatchlist', symbol], () => getIsInWatchlistRequest(symbol as string, getToken), {
    enabled: !!symbol,
  });
};
