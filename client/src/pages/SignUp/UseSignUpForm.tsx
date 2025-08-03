import { useState } from 'react';

interface SignupFormValues {
  fullName: string;
  email: string;
  password: string;
}

interface SignupFormErrors {
  [key: string]: string;
}

export const useSignupForm = () => {
  const [formValues, setFormValues] = useState<SignupFormValues>({
    fullName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: keyof SignupFormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validate = () => {
    const newErrors: SignupFormErrors = {};
    if (!formValues.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formValues.email.trim()) newErrors.email = 'Email is required';
    if (formValues.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formValues,
    errors,
    showPassword,
    handleChange,
    togglePasswordVisibility,
    validate,
  };
};
