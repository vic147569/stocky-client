import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const MainMenu = () => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex font-bold hover:text-yellow-500">{user?.fullName}</DropdownMenuTrigger>
      <DropdownMenuContent className=" w-40">
        <DropdownMenuItem className="justify-center">
          <Link to="/user-profile" className=" font-bold hover:text-yellow-500">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-center">
          <Link to="/watchlist" className=" font-bold hover:text-yellow-500">
            Watch List
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default MainMenu;
