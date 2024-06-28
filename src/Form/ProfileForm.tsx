/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { formScema, UserFormData } from './formSchema';
import { User } from '@/types';
import { Form } from '@/Components/ui/form';
import { Button } from '@/Components/ui/button';
import MyFormTitle from './MyFormTitle';
import MyFormField from './MyFormField';

type Props = { currentUser: User; onSave: (userProfileData: UserFormData) => void; isLoading: boolean };

const ProfileForm = ({ currentUser, onSave, isLoading }: Props) => {
  // use react hook form and zod resolver
  const form = useForm<UserFormData>({
    resolver: zodResolver(formScema),
    defaultValues: currentUser,
  });

  // use effect to update form after update user
  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className=" space-y-4 bg-gray-50 rounded-lg md:p-10 min-h-[550px]">
        <MyFormTitle />
        <MyFormField name="name" label="Name" />
        <MyFormField name="email" label="Email" />
        <MyFormField name="phone" label="Phone" />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
