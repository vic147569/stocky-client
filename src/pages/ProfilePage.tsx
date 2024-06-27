import { useGetUser } from '@/Api/UserApi';
import ProfileForm from '@/Form/ProfileForm';

const ProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetUser();

  if (isGetLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <div>Unable to load user</div>;
  }

  return <ProfileForm currentUser={currentUser} />;
};

export default ProfilePage;
