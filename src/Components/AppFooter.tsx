import { Link } from 'react-router-dom';

const AppFooter = () => (
  <div className="bg-sky-700 py-6">
    <div className=" container mx-auto">
      <Link to="/" className=" text-3xl text-yellow-500 tracking-tighter font-bold">
        Stocky
      </Link>
    </div>
  </div>
);
export default AppFooter;
