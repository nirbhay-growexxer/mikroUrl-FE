import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupFormData } from '../schemas/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import { api } from '../lib/axios';
import { API_ROUTES } from '../config/api-routes';
import { AuthResponse } from '@/types/auth';

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      bio: '',
    },
  });

  // Watch the bio field to update character count
  const bioValue = useWatch({
    control,
    name: 'bio',
    defaultValue: '',
  });

  const handleSignup = async (data: SignupFormData) => {
    try {
      const response = await api.post<AuthResponse>(
        API_ROUTES.AUTH.SIGNUP,
        data
      );
      console.log(response.data);
      dispatch(setCredentials(response.data.data));
      navigate('/profile');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Create your account
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit(handleSignup)}>
          <div className='rounded-md shadow-sm space-y-4'>
            <div>
              <label htmlFor='email' className='sr-only'>
                Email address
              </label>
              <input
                {...register('email')}
                id='email'
                type='email'
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Email address'
              />
              {errors.email && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor='name' className='sr-only'>
                Name
              </label>
              <input
                {...register('name')}
                id='name'
                type='text'
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Full name'
              />
              {errors.name && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                {...register('password')}
                id='password'
                type='password'
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Password'
              />
              {errors.password && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor='confirmPassword' className='sr-only'>
                Confirm Password
              </label>
              <input
                {...register('confirmPassword')}
                id='confirmPassword'
                type='password'
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Confirm password'
              />
              {errors.confirmPassword && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className='relative'>
              <label htmlFor='bio' className='sr-only'>
                Bio (optional)
              </label>
              <textarea
                {...register('bio')}
                id='bio'
                rows={3}
                maxLength={256}
                className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Tell us about yourself (optional)'
                aria-label='Biography'
              />
              {errors.bio && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.bio.message}
                </p>
              )}
            </div>
            <div className='text-right'>
              <span className='text-xs text-gray-500'>
                {bioValue?.length || 0}/256
              </span>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
