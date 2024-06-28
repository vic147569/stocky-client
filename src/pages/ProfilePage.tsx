import { useGetUser, useUpdateUser } from '@/Api/UserApi';
import ProfileForm from '@/Form/ProfileForm';

const ProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();

  if (isGetLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <div>Unable to load user</div>;
  }

  return <ProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading} />;
};

export default ProfilePage;
