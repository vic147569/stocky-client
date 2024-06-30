/* eslint-disable import/prefer-default-export */
import { useAuth } from '@clerk/clerk-react';
import { useMutation } from 'react-query';
import { CreateWatchlistRequest } from '@/types';

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
