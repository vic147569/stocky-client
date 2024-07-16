import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => (
  <div className="flex justify-around">
    <SignUp fallbackRedirectUrl={`${import.meta.env.VITE_CLERK_SIGN_UP_FORCE_REDIRECT_URL}auth-callback`} />
  </div>
);

export default SignUpPage;
