import { SignInButton, useAuth, useUser } from '@clerk/clerk-react';
import { CircleUserRound, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Separator } from '../ui/separator';
import MobileMenu from './MobileMenu';
import { Button } from '../ui/button';

const WelcomeTitle = () => <span>Welcome to Stocky</span>;
const UserTitle = () => {
  const { user } = useUser();
  const email = user?.emailAddresses[0].emailAddress;
  return (
    <span className="font-bold text-xl flex gap-4 items-center">
      <CircleUserRound className=" text-yellow-500" />
      {email}
    </span>
  );
};
const LoginButton = () => (
  <SignInButton>
    <Button className=" flex-1">Sign In</Button>
  </SignInButton>
);

const MobileNav = () => {
  const { isSignedIn } = useAuth();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className=" text-yellow-500" />
      </SheetTrigger>
      <SheetContent className="  flex flex-col">
        <SheetTitle>{isSignedIn ? <UserTitle /> : <WelcomeTitle />}</SheetTitle>
        <Separator />
        <SheetDescription className=" flex flex-col gap-4">
          {isSignedIn ? <MobileMenu /> : <LoginButton />}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNav;
