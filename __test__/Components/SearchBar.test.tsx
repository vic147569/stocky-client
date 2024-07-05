import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import SearchBar from '@/Components/SearchBar';

describe('SearchBar', () => {
  const mockOnSubmit = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the SearchBar component', () => {
    render(<SearchBar onSubmit={mockOnSubmit} />);

    expect(screen.getByPlaceholderText('Search stock by symbol')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('sets the default value correctly', () => {
    render(<SearchBar onSubmit={mockOnSubmit} searchQuery="AAPL" />);

    expect(screen.getByDisplayValue('AAPL')).toBeInTheDocument();
  });

  it('calls onSubmit with the correct values', async () => {
    render(<SearchBar onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText('Search stock by symbol');
    const button = screen.getByText('Submit');

    await userEvent.type(input, 'GOOGL');
    fireEvent.click(button);

    waitFor(() => expect(mockOnSubmit).toHaveBeenCalledWith({ searchQuery: 'GOOGL' }));
  });
});
