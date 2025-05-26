import React, { useState } from 'react';
import type { SignupResponse } from '../../api/types/authServices.types';
import { signup } from '../../api/services/authService';
import { setCookieItem } from '../../Utils/cookiesHelper';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const navigate = useNavigate();

  const signupHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSigningIn(true);
    
    try {
      const response: SignupResponse = await signup({username, email, password, role});
      toast.success("Signed Up Successfully");

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
            if(error instanceof AxiosError) {
              toast.error(error?.response?.data?.message);
            }
            console.error("Error in Login Handler : ", error);
          } finally {
            setIsSigningIn(false); 
          }
        };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <div className="flex gap-2 justify-center items-center mb-6">
          <ShieldCheck className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">AccessFlow</h1>
        </div>
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Sign Up</h2>
        <form onSubmit={signupHandler} className="space-y-5">
          <div>
            <label htmlFor="UserName" className="block text-sm font-medium text-gray-700">
              UserName
            </label>
            <input
              id="UserName"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="you@example.com"
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
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <div className="relative">
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 bg-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 appearance-none pr-10"
                required
              >
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-1">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={isSigningIn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSigningIn ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                 Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="text-blue-600 hover:underline">
            Log In
          </span>
        </p>
        <p className="mt-2 text-xs text-center text-gray-500">
          Note: Backend is deployed on Render. Initial requests may be slow as the server wakes up from idle.
        </p>
      </div>
    </div>
  );
};

export default Signup;
