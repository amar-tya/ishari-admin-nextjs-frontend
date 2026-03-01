import { LoginViewModel } from '@/presentation/view-models';

// Icons
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{
      width: 'clamp(1rem, 3vw, 1.25rem)',
      height: 'clamp(1rem, 3vw, 1.25rem)',
    }}
  >
    <path
      fillRule="evenodd"
      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
      clipRule="evenodd"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{
      width: 'clamp(1rem, 3vw, 1.25rem)',
      height: 'clamp(1rem, 3vw, 1.25rem)',
    }}
  >
    <path
      fillRule="evenodd"
      d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
      clipRule="evenodd"
    />
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{
      width: 'clamp(1rem, 3vw, 1.25rem)',
      height: 'clamp(1rem, 3vw, 1.25rem)',
    }}
  >
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path
      fillRule="evenodd"
      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
      clipRule="evenodd"
    />
  </svg>
);

const EyeSlashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{
      width: 'clamp(1rem, 3vw, 1.25rem)',
      height: 'clamp(1rem, 3vw, 1.25rem)',
    }}
  >
    <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
  </svg>
);

const LoadingSpinner = () => (
  <svg
    className="animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    style={{
      width: 'clamp(1.25rem, 4vw, 1.5rem)',
      height: 'clamp(1.25rem, 4vw, 1.5rem)',
    }}
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// Google Icon
const GoogleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    style={{
      width: 'clamp(1rem, 3vw, 1.25rem)',
      height: 'clamp(1rem, 3vw, 1.25rem)',
    }}
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

interface LoginFormProps {
  viewModel: LoginViewModel;
}

/**
 * LoginForm Component
 *
 * Reusable login form component yang menerima ViewModel sebagai props.
 * Hanya berisi UI, semua logic ada di ViewModel.
 */
export function LoginForm({ viewModel }: LoginFormProps) {
  const {
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
  } = viewModel;

  return (
    <div
      className="w-full bg-white rounded-2xl shadow-lg"
      style={{
        maxWidth: 'clamp(320px, 90vw, 440px)',
        padding: 'clamp(1.5rem, 5vw, 2.5rem)',
      }}
    >
      {/* Header */}
      <div
        className="text-center"
        style={{ marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}
      >
        <h1
          className="font-bold text-gray-800"
          style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)' }}
        >
          Masuk Dashboard
        </h1>
        <p
          className="text-gray-500"
          style={{
            fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
            marginTop: 'clamp(0.25rem, 1vw, 0.5rem)',
          }}
        >
          Silakan masuk ke akun Anda
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div
          className="bg-red-50 border border-red-200 text-red-700 rounded-lg"
          style={{
            padding: 'clamp(0.75rem, 2vw, 1rem)',
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
          }}
        >
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Username or Email Field */}
        <div style={{ marginBottom: 'clamp(1rem, 3vw, 1.25rem)' }}>
          <label
            htmlFor="usernameOrEmail"
            className="block text-gray-700 font-medium"
            style={{
              fontSize: 'clamp(0.8rem, 2.5vw, 0.875rem)',
              marginBottom: 'clamp(0.375rem, 1vw, 0.5rem)',
            }}
          >
            Username atau Email
          </label>
          <div className="relative">
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 flex items-center justify-center"
              style={{ width: 'clamp(2.5rem, 8vw, 3rem)' }}
            >
              <UserIcon />
            </span>
            <input
              type="text"
              id="usernameOrEmail"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder="Username atau Email"
              className="w-full border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              style={{
                paddingTop: 'clamp(0.625rem, 2vw, 0.875rem)',
                paddingBottom: 'clamp(0.625rem, 2vw, 0.875rem)',
                paddingLeft: 'clamp(2.5rem, 8vw, 3rem)',
                paddingRight: 'clamp(0.75rem, 2vw, 1rem)',
                fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
              }}
              disabled={isLoading}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}>
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium"
            style={{
              fontSize: 'clamp(0.8rem, 2.5vw, 0.875rem)',
              marginBottom: 'clamp(0.375rem, 1vw, 0.5rem)',
            }}
          >
            Password
          </label>
          <div className="relative">
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 flex items-center justify-center"
              style={{ width: 'clamp(2.5rem, 8vw, 3rem)' }}
            >
              <LockIcon />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              style={{
                paddingTop: 'clamp(0.625rem, 2vw, 0.875rem)',
                paddingBottom: 'clamp(0.625rem, 2vw, 0.875rem)',
                paddingLeft: 'clamp(2.5rem, 8vw, 3rem)',
                paddingRight: 'clamp(2.5rem, 8vw, 3rem)',
                fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
              }}
              disabled={isLoading}
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center"
              style={{ width: 'clamp(2.5rem, 8vw, 3rem)' }}
              tabIndex={-1}
            >
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
          style={{
            padding: 'clamp(0.75rem, 2.5vw, 1rem)',
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
          }}
        >
          {isLoading ? <LoadingSpinner /> : 'Masuk'}
        </button>
      </form>

      {/* Divider */}
      <div
        className="flex items-center"
        style={{ margin: 'clamp(1rem, 3vw, 1.5rem) 0' }}
      >
        <div className="flex-1 border-t border-gray-200" />
        <span
          className="text-gray-400"
          style={{
            padding: '0 clamp(0.75rem, 2vw, 1rem)',
            fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
          }}
        >
          atau
        </span>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      {/* Google Login Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        style={{
          padding: 'clamp(0.625rem, 2vw, 0.875rem)',
          fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
        }}
      >
        <GoogleIcon />
        Lanjutkan dengan Google
      </button>

      {/* Footer */}
      <div
        className="text-center text-gray-400"
        style={{
          marginTop: 'clamp(1.5rem, 4vw, 2rem)',
          fontSize: 'clamp(0.65rem, 2vw, 0.75rem)',
          letterSpacing: '0.05em',
        }}
      >
        DASHBOARD V1.0.0
      </div>
    </div>
  );
}
