import { useAuth } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
import { CreateUserRequest, UpdateUserRequest, User } from '@/types';

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

export const useGetUser = () => {
  const { getToken } = useAuth();

  const getUserRequest = async (): Promise<User> => {
    const token = await getToken();
    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to get user');
    }
    return response.json();
  };

  const { data: currentUser, isLoading, error } = useQuery('fetchCurrentUser', getUserRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isLoading };
};

export const useUpdateUser = () => {
  const { getToken } = useAuth();

  const updateUserRequest = async (formData: UpdateUserRequest) => {
    const token = await getToken();
    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    return response.json();
  };

  const { mutateAsync: updateUser, isLoading, isSuccess, error, reset } = useMutation(updateUserRequest);

  if (isSuccess) {
    toast.success('User profile update');
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isSuccess, isLoading, error, reset };
};
