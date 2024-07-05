/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useParams } from 'react-router-dom';
import * as clerk from '@clerk/clerk-react';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from 'react-query';
import DetailPage from '@/Pages/Detail';
import QuoteCard from '@/Components/QuoteCard';
import ChartCard from '@/Components/ChartCard';

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

vi.mock('@clerk/clerk-react');
const mockGetToken = vi.fn().mockResolvedValue('mock-token');
(clerk as any).useAuth = vi.fn().mockReturnValue({ getToken: mockGetToken });
// Mock react query
const queryClient = new QueryClient();
const wrapper: React.JSXElementConstructor<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('DetailPage', () => {
  const mockUseParams = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ symbol: 'AAPL' });
  });

  it('renders QuoteCard and ChartCard with correct props', () => {
    render(<DetailPage />, { wrapper });

    waitFor(() => {
      expect(mockUseParams).toHaveBeenCalled();
      expect(QuoteCard).toHaveBeenCalled();
      expect(ChartCard).toHaveBeenCalledWith({ symbol: 'AAPL' });
    });
  });
});
