import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState } from '../store/store';
import { logout, setUser } from '../store/authSlice';
import { api } from '../lib/axios';
import { User } from '@/types/user';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || '',
        bio: user.bio || '',
      });
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get('/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setUser((response.data as { user: User }).user));
    } catch (err) {
      setError('Failed to load profile data. Please try again later.');
      console.error('Error fetching profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user && token) {
      fetchUserProfile();
    }
  }, [token, user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    if (!token) return;

    setIsDeleting(true);

    try {
      await api.delete('/users/account', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(logout());
      navigate('/login', {
        state: { message: 'Your account has been successfully deleted.' },
      });
    } catch (err) {
      setError('Failed to delete account. Please try again later.');
      console.error('Error deleting account:', err);
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setIsUpdating(true);
    setUpdateError(null);

    try {
      const response = await api.put(
        '/users/profile',
        {
          name: editForm.name,
          bio: editForm.bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setUser((response.data as { user: User }).user));
      setIsEditing(false);
    } catch (err) {
      setUpdateError('Failed to update profile. Please try again later.');
      console.error('Error updating profile:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <div className='container mx-auto px-4 py-8'>
          <div className='flex justify-between items-center mb-6'>
            <h1 className='text-2xl font-bold'>Profile</h1>
            <Link
              to='/'
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              aria-label='Back to home'
              tabIndex={0}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 mr-2'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
                  clipRule='evenodd'
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
        {/* Profile Header */}
        <div className='bg-white shadow rounded-lg overflow-hidden'>
          <div className='px-4 py-5 sm:px-6 bg-indigo-600'>
            <h1 className='text-2xl font-bold text-white'>
              Welcome back, {user?.name}!
            </h1>
          </div>

          {/* Profile Content */}
          <div className='px-4 py-5 sm:p-6'>
            <div className='space-y-6'>
              {/* Profile Information */}
              <div className='bg-gray-50 p-4 rounded-md'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-xl font-semibold text-gray-900'>
                    Profile Information
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className='inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      aria-label='Edit profile'
                      tabIndex={0}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4 mr-1.5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                      </svg>
                      Edit
                    </button>
                  ) : null}
                </div>

                {updateError && (
                  <div className='mb-4 p-2 bg-red-50 text-red-700 text-sm rounded'>
                    {updateError}
                  </div>
                )}

                {!isEditing ? (
                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-500'>
                        Name
                      </label>
                      <div className='mt-1 text-sm text-gray-900'>
                        {user?.name}
                      </div>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-500'>
                        Email
                      </label>
                      <div className='mt-1 text-sm text-gray-900'>
                        {user?.email}
                      </div>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-500'>
                        Bio
                      </label>
                      <div className='mt-1 text-sm text-gray-900'>
                        {user?.bio || 'No bio provided'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleUpdateProfile} className='space-y-4'>
                    <div>
                      <label
                        htmlFor='name'
                        className='block text-sm font-medium text-gray-500'
                      >
                        Name
                      </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        value={editForm.name}
                        onChange={handleInputChange}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        required
                        aria-label='Your name'
                        tabIndex={0}
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-500'>
                        Email
                      </label>
                      <div className='mt-1 text-sm text-gray-900'>
                        {user?.email}
                      </div>
                      <p className='text-xs text-gray-500 mt-1'>
                        Email cannot be changed
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor='bio'
                        className='block text-sm font-medium text-gray-500'
                      >
                        Bio
                      </label>
                      <div className='relative'>
                        <textarea
                          id='bio'
                          name='bio'
                          value={editForm.bio}
                          onChange={handleInputChange}
                          rows={3}
                          maxLength={256}
                          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                          aria-label='Your bio'
                          tabIndex={0}
                        />
                      </div>
                      <div className='text-right'>
                        <span className='text-xs text-gray-500'>
                          {editForm.bio.length}/256
                        </span>
                      </div>
                    </div>
                    <div className='flex justify-end space-x-3 pt-2'>
                      <button
                        type='button'
                        onClick={() => setIsEditing(false)}
                        className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                        disabled={isUpdating}
                        aria-label='Cancel editing'
                        tabIndex={0}
                      >
                        Cancel
                      </button>
                      <button
                        type='submit'
                        className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center'
                        disabled={isUpdating}
                        aria-label='Save profile changes'
                        tabIndex={0}
                      >
                        {isUpdating ? (
                          <>
                            <svg
                              className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                            >
                              <circle
                                className='opacity-25'
                                cx='12'
                                cy='12'
                                r='10'
                                stroke='currentColor'
                                strokeWidth='4'
                              ></circle>
                              <path
                                className='opacity-75'
                                fill='currentColor'
                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                              ></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Account Actions */}
              <div className='flex justify-end space-x-4'>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                  aria-label='Delete account'
                  tabIndex={0}
                >
                  Delete Account
                </button>
                <button
                  onClick={handleLogout}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  aria-label='Logout'
                  tabIndex={0}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Section */}
        <div className='mt-8 bg-white shadow rounded-lg overflow-hidden'>
          <div className='px-4 py-5 sm:p-6'>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>
              Account Status
            </h2>
            <div className='bg-green-50 p-4 rounded-md'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-5 w-5 text-green-400'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='ml-3'>
                  <p className='text-sm font-medium text-green-800'>
                    Your account is active and in good standing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 max-w-md w-full mx-4'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>
              Delete Account
            </h3>
            <p className='text-sm text-gray-500 mb-6'>
              Are you sure you want to delete your account? This action cannot
              be undone and all your data will be permanently removed.
            </p>
            {error && (
              <div className='mb-4 p-2 bg-red-50 text-red-700 text-sm rounded'>
                {error}
              </div>
            )}
            <div className='flex justify-end space-x-3'>
              <button
                onClick={() => setShowDeleteModal(false)}
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                disabled={isDeleting}
                aria-label='Cancel'
                tabIndex={0}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center'
                disabled={isDeleting}
                aria-label='Confirm delete account'
                tabIndex={0}
              >
                {isDeleting ? (
                  <>
                    <svg
                      className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  'Delete Account'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
