import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store'; 
import { loginThunk } from "../../store/auth/authThunk"

export const useSignIn = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isValid = (): boolean => {
    return email.trim() !== '' && password.trim() !== '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;

    try {
      await dispatch(loginThunk({ email, password })).unwrap();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    handleSubmit,
  };
};
