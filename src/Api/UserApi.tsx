import { useAuth } from '@clerk/clerk-react';
import { useMutation } from 'react-query';

import { CreateUserRequest } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateUser = () => {
  const { getToken } = useAuth();
  const createUserRequest = async (user: CreateUserRequest) => {
    const token = await getToken();
    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error('Failed to create user!');
    }
  };
  const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createUserRequest);
  return { createUser, isLoading, isError, isSuccess };
};
export const a = 5;
