import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

const AppRoutes = () => (
  <div className=" container mx-auto flex-1 py-10">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </div>
);
export default AppRoutes;
