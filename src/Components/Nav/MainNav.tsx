import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Button } from '@/Components/ui/button';
import MainMenu from './MainMenu';

const MainNav = () => (
  <div>
    <SignedOut>
      <div className=" flex gap-3">
        <Button>
          <Link to="/sign-in">Sign In</Link>
        </Button>
        <Button>
          <Link to="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </SignedOut>
    <SignedIn>
      <div className=" flex gap-3">
        <UserButton />
        <MainMenu />
      </div>
    </SignedIn>
  </div>
);
export default MainNav;
