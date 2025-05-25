import { useState } from 'react';
import type { LoginResponse } from '../../api/types/authServices.types';
import { login } from '../../api/services/authService';
import { setCookieItem } from '../../Utils/cookiesHelper';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoggingIn(true);
  
    try {
      const response: LoginResponse = await login({username, password});

      setCookieItem('token', response?.token);
      setCookieItem('roleName', response?.user?.roleName);
      setCookieItem('username', response?.user?.username);

      const roleName = response?.user?.roleName;

      switch (roleName) {
        case 'Employee':
          navigate('/request-access')
          break;
        case 'Manager':
          navigate('/pending-requests')
          break;
        case 'Admin':
          navigate('/create-software')
          break;
      }
    } catch (error) {
      console.error("Error in Login Handler : ", error);
    } finally {
      setIsLoggingIn(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <div className="flex gap-2 justify-center items-center mb-6">
          <ShieldCheck className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">AccessFlow</h1>
        </div>
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Login</h2>
        <form onSubmit={loginHandler} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoggingIn ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Logging In...
              </>
            ) : (
              'Log In'
            )}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <span onClick={() => navigate('/signup')} className="text-blue-600 hover:underline">
            Sign Up
          </span>
        </p>
        <p className="mt-2 text-xs text-center text-gray-500">
          Note: Backend is deployed on Render. Initial requests may be slow as the server wakes up from idle.
        </p>
      </div>
    </div>
  );
};

export default Login;

