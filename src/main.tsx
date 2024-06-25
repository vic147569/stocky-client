import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './global.css';
import router from './Routes/routes';

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
