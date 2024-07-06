import { useUser } from '@clerk/clerk-react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateUser } from '@/Api/UserApi';
import { useCreateWatchlist } from '@/Api/WatchlistApi';

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { createUser } = useCreateUser();
  const { createWatchlist } = useCreateWatchlist();
  const hasCreatedUser = useRef(false);
  const hasCreatedWatchlist = useRef(false);

  useEffect(() => {
    if (user?.id && user.primaryEmailAddress && user.fullName && !hasCreatedUser.current) {
      createUser({ userId: user.id, name: user.fullName, email: user.primaryEmailAddress.emailAddress });
      hasCreatedUser.current = true;
      createWatchlist({ userId: user.id, stockList: [] });
      hasCreatedWatchlist.current = true;

      navigate('/');
    }
  }, [createUser, createWatchlist, navigate, user]);

  return <div>Loading</div>;
};

export default AuthCallbackPage;
