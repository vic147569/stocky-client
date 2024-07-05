/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as clerk from '@clerk/clerk-react';
import { vi } from 'vitest';
import MainMenu from '@/Components/Nav/MainMenu';

vi.mock('@clerk/clerk-react', () => ({
  useUser: vi.fn(),
}));

(clerk as any).useUser = vi.fn().mockReturnValue({ user: { fullName: 'John Doe' } });

describe('MainMenu', () => {
  // const mockUseUser = vi.fn().mockImplementation(clerk.useUser);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders user full name and menu items', () => {
    const user = { fullName: 'John Doe' };

    render(<MainMenu />);

    const triggerElement = screen.getByText(user.fullName);
    expect(triggerElement).toBeInTheDocument();

    fireEvent.click(triggerElement);

    waitFor(() => {
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Watch List')).toBeInTheDocument();
    });
  });

  it('does not render menu items if user is not logged in', () => {
    render(<MainMenu />);

    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    expect(screen.queryByText('Watch List')).not.toBeInTheDocument();
  });

  it('renders correct links for menu items', () => {
    const user = { fullName: 'John Doe' };

    render(<MainMenu />);

    fireEvent.click(screen.getByText(user.fullName));

    waitFor(() => {
      const profileLink = screen.getByText('Profile').closest('a');
      const watchlistLink = screen.getByText('Watch List').closest('a');
      expect(profileLink).toHaveAttribute('href', '/user-profile');
      expect(watchlistLink).toHaveAttribute('href', '/watchlist');
    });
  });
});
