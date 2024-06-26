import { Link } from 'react-router-dom';
import { SignOutButton } from '@clerk/clerk-react';
import { Button } from '../ui/button';

const MobileMenu = () => (
  <>
    <Link to="/user-profile" className=" flex-1 text-center text-lg font-bold hover:text-yellow-500">
      Profile
    </Link>
    <Link to="/watchlist" className=" flex-1 text-center text-lg font-bold hover:text-yellow-500">
      Watch List
    </Link>
    <Button>
      <SignOutButton />
    </Button>
  </>
);

export default MobileMenu;
