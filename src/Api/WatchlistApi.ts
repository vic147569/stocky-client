import { useAuth } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'react-query';
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

export const useGetWatchlist = () => {
  const { getToken } = useAuth();
  const getWatchlistRequest = async (): Promise<Watchlist> => {
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
  const { data: watchlist, isLoading, error } = useQuery('fetchWatchlist', getWatchlistRequest);
  return { watchlist, isLoading, error };
};

export const useGetIsInWatchlist = (symbol?: string) => {
  const { getToken } = useAuth();
  const getIsInWatchlistRequest = async (): Promise<IsInWatchlist> => {
    const token = await getToken();
    const response = await fetch(`${API_BASE_URL}/api/watchlist/${symbol}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response) {
      throw new Error('Failed to get isInWatchlist');
    }
    return response.json();
  };

  const {
    data: isInWatchlist,
    isLoading,
    error,
  } = useQuery('fetchIsInWatchlist', getIsInWatchlistRequest, { enabled: !!symbol });

  return { isInWatchlist, isLoading, error };
};
