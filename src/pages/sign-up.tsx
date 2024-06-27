import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => (
  <div className="flex justify-around">
    <SignUp path="/sign-up" />
  </div>
);

export default SignUpPage;
