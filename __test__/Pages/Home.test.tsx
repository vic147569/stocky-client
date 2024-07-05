import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';
import { vi } from 'vitest';
import HomePage from '@/Pages/Home';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('HomePage', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders homepage content and handles search submit', () => {
    render(<HomePage />);

    expect(screen.getByAltText('stocky')).toBeInTheDocument();
    expect(screen.getByText('Stocky, your investment partner!')).toBeInTheDocument();
    expect(screen.getByText('Get latest stock market information at Stocky')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search stock by symbol')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Search stock by symbol'), { target: { value: 'AAPL' } });
    fireEvent.click(screen.getByText('Submit'));

    waitFor(() => expect(mockNavigate).toHaveBeenCalledWith({ pathname: '/stock/AAPL' }));
  });
});
