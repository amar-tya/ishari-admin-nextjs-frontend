/**
 * Login ViewModel State
 */
export interface LoginViewModelState {
  usernameOrEmail: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Login ViewModel Actions
 */
export interface LoginViewModelActions {
  setUsernameOrEmail: (value: string) => void;
  setPassword: (value: string) => void;
  toggleShowPassword: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

/**
 * Login ViewModel Return Type
 */
export type LoginViewModel = LoginViewModelState & LoginViewModelActions;
