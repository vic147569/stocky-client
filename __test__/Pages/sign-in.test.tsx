import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import SignInPage from '@/Pages/sign-in';

vi.mock('@clerk/clerk-react', () => ({
  SignIn: vi.fn(() => <div data-testid="sign-in-component" />),
}));

describe('SignInPage', () => {
  it('renders SignIn component', () => {
    render(<SignInPage />);

    expect(screen.getByTestId('sign-in-component')).toBeInTheDocument();
  });
});
