import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import MobileMenu from '@/Components/Nav/MobileMenu';

vi.mock('@clerk/clerk-react', () => ({
  SignOutButton: vi.fn(() => (
    <button type="button" data-testid="sign-out-button">
      Sign Out
    </button>
  )),
}));

describe('MobileMenu', () => {
  it('renders profile and watchlist links', () => {
    render(
      <BrowserRouter>
        <MobileMenu />
      </BrowserRouter>,
    );

    const profileLink = screen.getByText('Profile').closest('a');
    const watchlistLink = screen.getByText('Watch List').closest('a');

    expect(profileLink).toHaveAttribute('href', '/user-profile');
    expect(watchlistLink).toHaveAttribute('href', '/watchlist');
  });

  it('renders sign out button', () => {
    render(
      <BrowserRouter>
        <MobileMenu />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('sign-out-button')).toBeInTheDocument();
  });
});
