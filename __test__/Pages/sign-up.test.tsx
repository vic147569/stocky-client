import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import SignUpPage from '@/Pages/sign-up';

vi.mock('@clerk/clerk-react', () => ({
  SignUp: vi.fn(() => <div data-testid="sign-up-component" />),
}));

describe('SignUpPage', () => {
  it('renders SignUp component', () => {
    render(<SignUpPage />);

    expect(screen.getByTestId('sign-up-component')).toBeInTheDocument();
  });
});
