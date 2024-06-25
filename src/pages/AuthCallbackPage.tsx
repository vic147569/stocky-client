import { useUser } from '@clerk/clerk-react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateUser } from '@/Api/UserApi';

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { createUser } = useCreateUser();
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (user?.id && user.primaryEmailAddress && !hasCreatedUser.current) {
      createUser({ userId: user.id, email: user.primaryEmailAddress.emailAddress });
      hasCreatedUser.current = true;
      navigate('/');
    }
  }, [createUser, navigate, user]);

  return <div>Loading</div>;
};

export default AuthCallbackPage;
