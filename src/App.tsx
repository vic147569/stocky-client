import { BrowserRouter as Router } from 'react-router-dom';
import AppFooter from './Components/AppFooter';
import AppHeader from './Components/AppHeader';
import AppRoutes from './routes';

const App: React.FC = () => (
  <Router>
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <div className=" container mx-auto flex-1 py-10">
        <AppRoutes />
      </div>
      <AppFooter />
    </div>
  </Router>
);
export default App;
