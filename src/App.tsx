import { BrowserRouter as Router } from 'react-router-dom';
import AppFooter from './Components/AppFooter';
import AppHeader from './Components/AppHeader';
import AppRoutes from './routes';

const App: React.FC = () => (
  <Router>
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <AppRoutes />
      <AppFooter />
    </div>
  </Router>
);
export default App;
