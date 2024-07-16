import { vi } from 'vitest';
import '@testing-library/jest-dom';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import router from '@/Routes/routes';

// Mock the router
vi.mock('react-router-dom', async () => ({
  ...vi.importActual('react-router-dom'),
  RouterProvider: vi.fn().mockImplementation((props) => props.children),
  createBrowserRouter: () => vi.fn(),
}));

// Mock ReactDOM.createRoot and render methods
const root = {
  render: vi.fn(),
};
const createRootSpy = vi.spyOn(ReactDOM, 'createRoot').mockReturnValue(root as unknown as ReactDOM.Root);

// Mock document.getElementById
const getElementByIdSpy = vi.spyOn(document, 'getElementById').mockReturnValue(document.createElement('div'));

// Mock the CSS import
vi.mock('./global.css', () => ({}));

describe('Root rendering', () => {
  it('renders RouterProvider with router', async () => {
    // Import the main entry file
    await import('@/main');

    // Ensure createRoot and render are called correctly
    expect(getElementByIdSpy).toHaveBeenCalledWith('root');
    expect(createRootSpy).toHaveBeenCalledWith(expect.any(HTMLElement));
    expect(root.render).toHaveBeenCalledWith(
      <Suspense fallback={<div>Loading</div>}>
        <RouterProvider router={router} />
      </Suspense>,
    );
  });
});
