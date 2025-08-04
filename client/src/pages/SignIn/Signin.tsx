
import React from 'react';
import SignInForm from './SignInForm'; 
import { useSignIn } from "./useSignIn"

const SignIn = () => {
  const signInProps = useSignIn();
  return <SignInForm {...signInProps} />;
};

export default SignIn;
