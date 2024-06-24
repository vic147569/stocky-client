import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Button } from '@/Components/ui/button';
import MainMenu from './MainMenu';

const MainNav = () => (
  <div>
    <SignedOut>
      <Button>
        <SignInButton />
      </Button>
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
