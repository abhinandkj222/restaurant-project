import { GoogleLogin } from '@react-oauth/google';

const LoginModal = ({ isOpen, onClose, onGoogleSuccess }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-4 text-2xl text-gray-500 hover:text-gray-800"
        >
          ×
        </button>

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to continue to Savory
          </p>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={onGoogleSuccess}
            onError={() => {
              console.error('google login failed');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
