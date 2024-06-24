import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => (
  <div className="mx-auto my-auto">
    <SignIn path="/sign-in" />
  </div>
);

export default SignInPage;
