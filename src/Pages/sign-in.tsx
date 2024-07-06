import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => (
  <div className="flex justify-around">
    <SignIn path="/sign-in" />
  </div>
);

export default SignInPage;
