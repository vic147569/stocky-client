import { Link } from 'react-router-dom';
import MobileNav from './Nav/MobileNav';
import MainNav from './Nav/MainNav';

const AppHeader = () => (
  <div className="bg-sky-700 py-6">
    <div className=" container mx-auto flex justify-between items-center">
      <Link to="/" className=" text-3xl text-yellow-500 tracking-tighter font-bold">
        Stocky
      </Link>
      <div className=" md:hidden">
        <MobileNav />
      </div>
      <div className=" hidden md:block">
        <MainNav />
      </div>
    </div>
  </div>
);
export default AppHeader;
