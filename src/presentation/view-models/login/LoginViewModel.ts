'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@/presentation/hooks';
import { getErrorMessage } from '@/shared/utils';
import type { LoginViewModel } from './LoginViewModel.types';

// Re-export types
export type {
  LoginViewModel,
  LoginViewModelState,
  LoginViewModelActions,
} from './LoginViewModel.types';

/**
 * useLoginViewModel
 *
 * Presenter/ViewModel untuk Login Screen.
 * Menggunakan useAuth hook untuk login action.
 */
export function useLoginViewModel(): LoginViewModel {
  const { login, loginWithGoogle } = useAuth();

  // State
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Actions
  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setIsLoading(true);

      try {
        const result = await login({
          username_or_email: usernameOrEmail,
          password,
        });

        if (result.success) {
          window.location.href = '/dashboard';
        } else {
          setError(getErrorMessage(result.error));
        }
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    },
    [usernameOrEmail, password, login]
  );

  const handleGoogleLogin = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await loginWithGoogle();
      // Supabase akan redirect ke Google, isLoading tetap true
    } catch (err) {
      setError(getErrorMessage(err));
      setIsLoading(false);
    }
  }, [loginWithGoogle]);

  return {
    usernameOrEmail,
    password,
    showPassword,
    isLoading,
    error,
    setUsernameOrEmail,
    setPassword,
    toggleShowPassword,
    handleSubmit,
    handleGoogleLogin,
  };
}
