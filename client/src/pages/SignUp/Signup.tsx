import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupForm } from './useSignupForm';
import SignupForm from './SignupForm';
import { useAppDispatch } from './../../hooks/useAppDispatch';
import {signupThunk} from "../../store/auth/authThunk"
const SignupPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    formValues,
    errors,
    showPassword,
    handleChange,
    togglePasswordVisibility,
    validate,
  } = useSignupForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const resultAction = await dispatch(
      signupThunk({
        name: formValues.fullName,
        email: formValues.email,
        password: formValues.password,
      })
    );

    if (signupThunk.fulfilled.match(resultAction)) {
      navigate('/dashboard');
    }
  };

  return (
    <SignupForm
      formValues={formValues}
      errors={errors}
      showPassword={showPassword}
      onChange={handleChange}
      onTogglePassword={togglePasswordVisibility}
      onSubmit={handleSubmit}
    />
  );
};

export default SignupPage;
