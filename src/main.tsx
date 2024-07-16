import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './global.css';
import { Suspense } from 'react';
import router from './Routes/routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<div>Loading</div>}>
    <RouterProvider router={router} />, //{' '}
  </Suspense>,
);
