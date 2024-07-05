import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProfilePage from '@/Pages/ProfilePage';
import { useGetUser, useUpdateUser } from '@/Api/UserApi';

vi.mock('@/Api/UserApi', () => ({
  useGetUser: vi.fn(),
  useUpdateUser: vi.fn(),
}));

// Mock react query
const queryClient = new QueryClient();
const wrapper: React.JSXElementConstructor<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('ProfilePage', () => {
  const mockUseGetUser = vi.fn().mockImplementation(useGetUser);
  const mockUseUpdateUser = vi.fn().mockImplementation(useUpdateUser);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state while fetching user data', () => {
    (useGetUser as jest.Mock).mockReturnValue({ data: null, isLoading: true });
    (useUpdateUser as jest.Mock).mockReturnValue({ data: null, isLoading: true });

    render(<ProfilePage />, { wrapper });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    waitFor(() => {
      expect(mockUseGetUser).toHaveBeenCalled();
      expect(mockUseUpdateUser).not.toHaveBeenCalled();
    });
  });

  it('renders "Unable to load user" when user data is not available', () => {
    (useGetUser as jest.Mock).mockReturnValue({ data: null, isLoading: false });

    render(<ProfilePage />, { wrapper });

    expect(screen.getByText('Unable to load user')).toBeInTheDocument();
    waitFor(() => {
      expect(mockUseGetUser).toHaveBeenCalled();
      expect(mockUseUpdateUser).not.toHaveBeenCalled();
    });
  });

  it('renders ProfileForm with current user data', () => {
    const currentUser = { id: 'user123', name: 'John Doe', email: 'john@example.com' };

    (useGetUser as jest.Mock).mockReturnValue({ data: currentUser, isLoading: false });
    render(<ProfilePage />, { wrapper });

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Unable to load user')).not.toBeInTheDocument();

    expect(useGetUser).toHaveBeenCalled();
  });
});
